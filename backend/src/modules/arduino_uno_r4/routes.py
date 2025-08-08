"""
Arduino Uno R4 Minima API Routes
Defines REST API endpoints for Arduino MUX control
"""

from flask import Blueprint, jsonify, request
from .controller import ArduinoController
import logging

logger = logging.getLogger(__name__)

# Create blueprint for Arduino routes
arduino_bp = Blueprint('arduino', __name__, url_prefix='/api/arduino')

# Global controller instance
arduino_controller = ArduinoController()

@arduino_bp.route('/connect', methods=['POST'])
def connect():
    """Connect to Arduino device"""
    try:
        success = arduino_controller.connect()
        if success:
            return jsonify({
                "status": "success",
                "message": "Connected to Arduino",
                "connected": True
            }), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Failed to connect to Arduino",
                "connected": False
            }), 500
    except Exception as e:
        logger.error(f"Connection error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e),
            "connected": False
        }), 500

@arduino_bp.route('/disconnect', methods=['POST'])
def disconnect():
    """Disconnect from Arduino device"""
    try:
        arduino_controller.disconnect()
        return jsonify({
            "status": "success",
            "message": "Disconnected from Arduino",
            "connected": False
        }), 200
    except Exception as e:
        logger.error(f"Disconnection error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@arduino_bp.route('/status', methods=['GET'])
def get_status():
    """Get Arduino connection and device status"""
    try:
        status = arduino_controller.get_status()
        return jsonify({
            "status": "success",
            "data": status
        }), 200
    except Exception as e:
        logger.error(f"Status error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@arduino_bp.route('/mux/position', methods=['GET'])
def get_mux_position():
    """Get current MUX position"""
    try:
        position = arduino_controller.get_mux_position()
        if position is not None:
            return jsonify({
                "status": "success",
                "data": {
                    "position": position
                }
            }), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Failed to get MUX position"
            }), 500
    except Exception as e:
        logger.error(f"Get position error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@arduino_bp.route('/mux/position', methods=['POST'])
def set_mux_position():
    """Set MUX position"""
    try:
        data = request.get_json()
        if not data or 'position' not in data:
            return jsonify({
                "status": "error",
                "message": "Position parameter required"
            }), 400
        
        position = int(data['position'])
        success = arduino_controller.set_mux_position(position)
        
        if success:
            return jsonify({
                "status": "success",
                "message": f"MUX position set to {position}",
                "data": {
                    "position": position
                }
            }), 200
        else:
            return jsonify({
                "status": "error",
                "message": "Failed to set MUX position"
            }), 500
            
    except ValueError:
        return jsonify({
            "status": "error",
            "message": "Invalid position value"
        }), 400
    except Exception as e:
        logger.error(f"Set position error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@arduino_bp.route('/mux/positions', methods=['GET'])
def get_available_positions():
    """Get list of available MUX positions"""
    try:
        # This would typically come from configuration or device query
        positions = list(range(1, 9))  # Example: 8 positions
        return jsonify({
            "status": "success",
            "data": {
                "positions": positions,
                "count": len(positions)
            }
        }), 200
    except Exception as e:
        logger.error(f"Get positions error: {e}")
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

# Error handlers for this blueprint
@arduino_bp.errorhandler(404)
def not_found(error):
    return jsonify({
        "status": "error",
        "message": "Endpoint not found"
    }), 404

@arduino_bp.errorhandler(500)
def internal_error(error):
    return jsonify({
        "status": "error",
        "message": "Internal server error"
    }), 500

