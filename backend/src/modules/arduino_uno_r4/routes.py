"""
Arduino Uno R4 Minima API Routes
Defines REST API endpoints for Arduino MUX control
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List
from .controller import ArduinoController
import logging

logger = logging.getLogger(__name__)

# Create router for Arduino routes
arduino_uno_r4_router = APIRouter(prefix="/api/arduino", tags=["Arduino Uno R4"])

# Global controller instance
arduino_controller = ArduinoController()

# Pydantic models for request/response
class PositionRequest(BaseModel):
    position: int

class StatusResponse(BaseModel):
    status: str
    data: Dict[str, Any] = None
    message: str = None

class PositionResponse(BaseModel):
    status: str
    data: Dict[str, Any] = None
    message: str = None

@arduino_uno_r4_router.post("/connect")
async def connect() -> Dict[str, Any]:
    """Connect to Arduino device"""
    try:
        success = arduino_controller.connect()
        if success:
            return {
                "status": "success",
                "message": "Connected to Arduino",
                "data": {"connected": True}
            }
        else:
            raise HTTPException(
                status_code=500,
                detail={
                    "status": "error",
                    "message": "Failed to connect to Arduino",
                    "data": {"connected": False}
                }
            )
    except Exception as e:
        logger.error(f"Connection error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": str(e),
                "data": {"connected": False}
            }
        )

@arduino_uno_r4_router.post("/disconnect")
async def disconnect() -> Dict[str, Any]:
    """Disconnect from Arduino device"""
    try:
        arduino_controller.disconnect()
        return {
            "status": "success",
            "message": "Disconnected from Arduino",
            "data": {"connected": False}
        }
    except Exception as e:
        logger.error(f"Disconnection error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": str(e)
            }
        )

@arduino_uno_r4_router.get("/status")
async def get_status() -> Dict[str, Any]:
    """Get Arduino connection and device status"""
    try:
        status = arduino_controller.get_status()
        return {
            "status": "success",
            "data": status
        }
    except Exception as e:
        logger.error(f"Status error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": str(e)
            }
        )

@arduino_uno_r4_router.get("/mux/position")
async def get_mux_position() -> Dict[str, Any]:
    """Get current MUX position"""
    try:
        position = arduino_controller.get_mux_position()
        if position is not None:
            return {
                "status": "success",
                "data": {
                    "current_position": position
                }
            }
        else:
            raise HTTPException(
                status_code=500,
                detail={
                    "status": "error",
                    "message": "Failed to get MUX position"
                }
            )
    except Exception as e:
        logger.error(f"Get position error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": str(e)
            }
        )

@arduino_uno_r4_router.post("/mux/position")
async def set_mux_position(request: PositionRequest) -> Dict[str, Any]:
    """Set MUX position"""
    try:
        position = request.position
        success = arduino_controller.set_mux_position(position)
        
        if success:
            return {
                "status": "success",
                "message": f"MUX position set to {position}",
                "data": {
                    "current_position": position,
                    "target_position": position
                }
            }
        else:
            raise HTTPException(
                status_code=500,
                detail={
                    "status": "error",
                    "message": "Failed to set MUX position"
                }
            )
            
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail={
                "status": "error",
                "message": "Invalid position value"
            }
        )
    except Exception as e:
        logger.error(f"Set position error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": str(e)
            }
        )

@arduino_uno_r4_router.get("/mux/positions")
async def get_available_positions() -> Dict[str, Any]:
    """Get list of available MUX positions"""
    try:
        # This would typically come from configuration or device query
        positions = list(range(1, 9))  # Example: 8 positions
        return {
            "status": "success",
            "data": {
                "positions": positions,
                "min_position": min(positions),
                "max_position": max(positions)
            }
        }
    except Exception as e:
        logger.error(f"Get positions error: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "status": "error",
                "message": str(e)
            }
        )

