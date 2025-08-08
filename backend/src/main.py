"""
Main FastAPI Application Entry Point
Implements dynamic module loading for hardware device control
"""

import os
import sys
import importlib
import logging
from pathlib import Path
from typing import List, Dict, Any

# DON'T CHANGE THIS !!!
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
import uvicorn

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="IR Pump-Probe Spectroscopy Control Interface",
    description="Unified control interface for IR spectroscopy hardware components",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Enable CORS for all routes (required for frontend-backend communication)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to store registered modules
registered_modules: List[str] = []

def discover_and_register_modules() -> List[str]:
    """
    Dynamically discover and register all hardware module routers
    Scans the modules directory and imports routes from each module
    """
    modules_dir = Path(__file__).parent / 'modules'
    modules_registered = []
    
    if not modules_dir.exists():
        logger.warning(f"Modules directory not found: {modules_dir}")
        return modules_registered
    
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
                    
                    # Look for router in the module
                    # Convention: router should be named {module_name}_router
                    router_name = f"{module_name}_router"
                    
                    if hasattr(routes_module, router_name):
                        router = getattr(routes_module, router_name)
                        app.include_router(router)
                        modules_registered.append(module_name)
                        logger.info(f"Registered module: {module_name}")
                    else:
                        logger.warning(f"No router '{router_name}' found in {module_name}")
                        
                except Exception as e:
                    logger.error(f"Failed to import module {module_name}: {e}")
            else:
                logger.warning(f"No routes.py found in module: {module_name}")
    
    return modules_registered

# Register all hardware modules
registered_modules = discover_and_register_modules()

# Response models
class ApiResponse:
    def __init__(self, status: str, message: str = None, data: Any = None):
        self.status = status
        self.message = message
        self.data = data

# API endpoint to list available modules
@app.get("/api/modules")
async def list_modules() -> Dict[str, Any]:
    """Return list of registered hardware modules"""
    return {
        "status": "success",
        "data": {
            "modules": registered_modules,
            "count": len(registered_modules)
        }
    }

# Health check endpoint
@app.get("/api/health")
async def health_check() -> Dict[str, Any]:
    """Health check endpoint"""
    return {
        "status": "success",
        "message": "IR Spectroscopy Control Interface API is running",
        "modules_loaded": len(registered_modules)
    }

# System information endpoint
@app.get("/api/system/info")
async def system_info() -> Dict[str, Any]:
    """Return system information"""
    return {
        "status": "success",
        "data": {
            "application": "IR Pump-Probe Spectroscopy Control Interface",
            "version": "1.0.0",
            "modules": registered_modules,
            "api_base": "/api"
        }
    }

# Mount static files for frontend (for production deployment)
static_folder_path = os.path.join(os.path.dirname(__file__), 'static')
if os.path.exists(static_folder_path):
    app.mount("/static", StaticFiles(directory=static_folder_path), name="static")

# Serve frontend files
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serve frontend files from static directory"""
    if not os.path.exists(static_folder_path):
        return JSONResponse({
            "status": "info",
            "message": "IR Spectroscopy Control Interface API",
            "frontend": "Not deployed",
            "api_endpoints": [
                "/api/health",
                "/api/modules",
                "/api/system/info",
                "/api/docs"
            ],
            "modules": registered_modules
        })

    # Try to serve the requested file
    file_path = os.path.join(static_folder_path, full_path)
    if full_path and os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Serve index.html for SPA routing
    index_path = os.path.join(static_folder_path, 'index.html')
    if os.path.exists(index_path):
        return FileResponse(index_path)
    
    # Return API info if no frontend is deployed
    return JSONResponse({
        "status": "info",
        "message": "IR Spectroscopy Control Interface API",
        "frontend": "Not deployed",
        "api_endpoints": [
            "/api/health",
            "/api/modules",
            "/api/system/info",
            "/api/docs"
        ],
        "modules": registered_modules
    })

# Exception handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "status": "error",
            "message": "Endpoint not found"
        }
    )

@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "status": "error",
            "message": "Internal server error"
        }
    )

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("Starting IR Spectroscopy Control Interface")
    logger.info(f"Registered modules: {registered_modules}")

if __name__ == '__main__':
    logger.info("Starting IR Spectroscopy Control Interface with uvicorn")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

