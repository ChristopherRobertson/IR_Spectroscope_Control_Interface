"""
Arduino Uno R4 Minima Controller Module
Handles MUX control for sample positioning
"""

import serial
import time
import logging
from typing import Optional, Dict, Any
import toml
import os

logger = logging.getLogger(__name__)

class ArduinoController:
    """Controller for Arduino Uno R4 Minima MUX operations"""
    
    def __init__(self, config_path: str = None):
        """Initialize Arduino controller with configuration"""
        self.connection: Optional[serial.Serial] = None
        self.config = self._load_config(config_path)
        self.is_connected = False
        
    def _load_config(self, config_path: str = None) -> Dict[str, Any]:
        """Load configuration from TOML file"""
        if config_path is None:
            # Default to hardware_configuration.toml in project root
            project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
            config_path = os.path.join(project_root, "hardware_configuration.toml")
        
        try:
            with open(config_path, 'r') as f:
                config = toml.load(f)
            return config.get('arduino_uno_r4', {})
        except Exception as e:
            logger.error(f"Failed to load configuration: {e}")
            return {}
    
    def connect(self) -> bool:
        """Establish connection to Arduino"""
        try:
            port = self.config.get('port', 'COM3')
            baud_rate = self.config.get('baud_rate', 115200)
            timeout = self.config.get('timeout', 2.0)
            
            self.connection = serial.Serial(
                port=port,
                baudrate=baud_rate,
                timeout=timeout
            )
            
            # Wait for Arduino to initialize
            time.sleep(2)
            
            # Test connection
            if self._test_connection():
                self.is_connected = True
                logger.info(f"Successfully connected to Arduino on {port}")
                return True
            else:
                self.disconnect()
                return False
                
        except Exception as e:
            logger.error(f"Failed to connect to Arduino: {e}")
            return False
    
    def disconnect(self) -> None:
        """Close connection to Arduino"""
        if self.connection and self.connection.is_open:
            self.connection.close()
        self.is_connected = False
        logger.info("Disconnected from Arduino")
    
    def _test_connection(self) -> bool:
        """Test if Arduino is responding"""
        try:
            self.connection.write(b"PING\n")
            response = self.connection.readline().decode().strip()
            return response == "PONG"
        except Exception as e:
            logger.error(f"Connection test failed: {e}")
            return False
    
    def set_mux_position(self, position: int) -> bool:
        """Set MUX to specific position"""
        if not self.is_connected:
            logger.error("Arduino not connected")
            return False
        
        try:
            command = f"MUX {position}\n"
            self.connection.write(command.encode())
            response = self.connection.readline().decode().strip()
            
            if response == f"MUX_SET {position}":
                logger.info(f"MUX position set to {position}")
                return True
            else:
                logger.error(f"Unexpected response: {response}")
                return False
                
        except Exception as e:
            logger.error(f"Failed to set MUX position: {e}")
            return False
    
    def get_mux_position(self) -> Optional[int]:
        """Get current MUX position"""
        if not self.is_connected:
            logger.error("Arduino not connected")
            return None
        
        try:
            self.connection.write(b"GET_MUX\n")
            response = self.connection.readline().decode().strip()
            
            if response.startswith("MUX_POS "):
                position = int(response.split()[1])
                return position
            else:
                logger.error(f"Unexpected response: {response}")
                return None
                
        except Exception as e:
            logger.error(f"Failed to get MUX position: {e}")
            return None
    
    def get_status(self) -> Dict[str, Any]:
        """Get Arduino status information"""
        return {
            "connected": self.is_connected,
            "port": self.config.get('port', 'Unknown'),
            "device_type": self.config.get('device_type', 'Arduino Uno R4 Minima'),
            "current_position": self.get_mux_position() if self.is_connected else None
        }
    
    def __enter__(self):
        """Context manager entry"""
        self.connect()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        """Context manager exit"""
        self.disconnect()

