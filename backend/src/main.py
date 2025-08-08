"""
Main Flask Application Entry Point
Implements dynamic module loading for hardware device control
"""

import os
import sys
import importlib
import logging
from pathlib import Path

# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create Flask app
app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), 'static'))
app.config['SECRET_KEY'] = 'spectroscopy_control_interface_secret_key'

# Enable CORS for all routes (required for frontend-backend communication)
CORS(app, origins="*")

def discover_and_register_modules():
    """
    Dynamically discover and register all hardware module blueprints
    Scans the modules directory and imports routes from each module
    """
    modules_dir = Path(__file__).parent / 'modules'
    registered_modules = []
    
    if not modules_dir.exists():
        logger.warning(f"Modules directory not found: {modules_dir}")
        return registered_modules
    
    # Iterate through each module directory
    for module_path in modules_dir.iterdir():
        if module_path.is_dir() and not module_path.name.startswith('__'):
            module_name = module_path.name
            routes_file = module_path / 'routes.py'
            
            if routes_file.exists():
                try:
                    # Import the routes module
                    module_import_path = f"src.modules.{module_name}.routes"
                    routes_module = importlib.import_module(module_import_path)
                    
                    # Look for blueprint in the module
                    # Convention: blueprint should be named {module_name}_bp
                    blueprint_name = f"{module_name}_bp"
                    
                    if hasattr(routes_module, blueprint_name):
                        blueprint = getattr(routes_module, blueprint_name)
                        app.register_blueprint(blueprint)
                        registered_modules.append(module_name)
                        logger.info(f"Registered module: {module_name}")
                    else:
                        logger.warning(f"No blueprint '{blueprint_name}' found in {module_name}")
                        
                except Exception as e:
                    logger.error(f"Failed to import module {module_name}: {e}")
            else:
                logger.warning(f"No routes.py found in module: {module_name}")
    
    return registered_modules

# Register all hardware modules
registered_modules = discover_and_register_modules()

# API endpoint to list available modules
@app.route('/api/modules', methods=['GET'])
def list_modules():
    """Return list of registered hardware modules"""
    return jsonify({
        "status": "success",
        "data": {
            "modules": registered_modules,
            "count": len(registered_modules)
        }
    })

# Health check endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "success",
        "message": "IR Spectroscopy Control Interface API is running",
        "modules_loaded": len(registered_modules)
    })

# System information endpoint
@app.route('/api/system/info', methods=['GET'])
def system_info():
    """Return system information"""
    return jsonify({
        "status": "success",
        "data": {
            "application": "IR Pump-Probe Spectroscopy Control Interface",
            "version": "1.0.0",
            "modules": registered_modules,
            "api_base": "/api"
        }
    })

# Serve frontend files (for production deployment)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    """Serve frontend files from static directory"""
    static_folder_path = app.static_folder
    if static_folder_path is None:
        return jsonify({
            "status": "error",
            "message": "Static folder not configured"
        }), 404

    if path != "" and os.path.exists(os.path.join(static_folder_path, path)):
        return send_from_directory(static_folder_path, path)
    else:
        index_path = os.path.join(static_folder_path, 'index.html')
        if os.path.exists(index_path):
            return send_from_directory(static_folder_path, 'index.html')
        else:
            # Return API info if no frontend is deployed
            return jsonify({
                "status": "info",
                "message": "IR Spectroscopy Control Interface API",
                "frontend": "Not deployed",
                "api_endpoints": [
                    "/api/health",
                    "/api/modules",
                    "/api/system/info"
                ],
                "modules": registered_modules
            })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "status": "error",
        "message": "Endpoint not found"
    }), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "status": "error",
        "message": "Internal server error"
    }), 500

if __name__ == '__main__':
    logger.info("Starting IR Spectroscopy Control Interface")
    logger.info(f"Registered modules: {registered_modules}")
    app.run(host='0.0.0.0', port=5000, debug=True)

