# System Architecture Documentation

## Table of Contents

1. [Core Philosophy](#core-philosophy)
2. [System Overview](#system-overview)
3. [Backend Architecture](#backend-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Data Flow](#data-flow)
6. [Module Development Guide](#module-development-guide)
7. [Configuration Management](#configuration-management)
8. [Communication Protocols](#communication-protocols)
9. [Error Handling](#error-handling)
10. [Security Considerations](#security-considerations)
11. [Performance Optimization](#performance-optimization)
12. [Testing Strategy](#testing-strategy)

## Core Philosophy

The IR Pump-Probe Spectroscopy Control Interface is architected as a **modular monolith** designed for maintainability, extensibility, and operational reliability. The system embraces the principle of "separation of concerns" while maintaining the simplicity of a unified deployment model.

### Design Principles

**Modularity**: Each hardware device is treated as an independent, self-contained module with its own logic, API endpoints, and user interface components. This allows for parallel development, easier testing, and simplified maintenance.

**Scalability**: The architecture supports easy addition of new hardware devices without modifying existing code. New modules are automatically discovered and integrated into the system.

**Reliability**: The system is designed to handle hardware failures gracefully, with comprehensive error handling and status monitoring for each device.

**Usability**: The user interface provides both individual device control and coordinated experiment automation, catering to different operational needs.

**Maintainability**: Clear separation between backend logic and frontend presentation, with well-defined APIs and consistent coding patterns across all modules.

## System Overview

The system consists of three primary layers:

1. **Hardware Layer**: Physical devices connected via USB, serial, or network interfaces
2. **Backend Layer**: Python Flask application providing device control and API services
3. **Frontend Layer**: React web application providing user interface and visualization

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer (React)                   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐ │
│  │   Arduino   │ │   MIRcat    │ │  PicoScope  │ │  ...   │ │
│  │   Module    │ │   Module    │ │   Module    │ │        │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │ HTTP/REST API
┌─────────────────────────────────────────────────────────────┐
│                    Backend Layer (Flask)                    │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐ │
│  │   Arduino   │ │   MIRcat    │ │  PicoScope  │ │  ...   │ │
│  │  Controller │ │  Controller │ │  Controller │ │        │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │ Device Drivers/SDKs
┌─────────────────────────────────────────────────────────────┐
│                     Hardware Layer                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌────────┐ │
│  │   Arduino   │ │   MIRcat    │ │  PicoScope  │ │  ...   │ │
│  │    R4       │ │   Laser     │ │   5244D     │ │        │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Backend Architecture

### Directory Structure Deep Dive

The backend follows a modular architecture where each hardware device is implemented as a self-contained Python package:

```
backend/
├── src/
│   ├── main.py                 # Application entry point and module discovery
│   └── modules/                # Hardware device modules
│       ├── arduino_uno_r4/     # Arduino MUX controller module
│       │   ├── __init__.py     # Package initialization
│       │   ├── controller.py   # Device control logic
│       │   ├── routes.py       # API endpoint definitions
│       │   ├── utils.py        # Helper functions and utilities
│       │   └── sdk/            # Device-specific SDK files
│       ├── daylight_mircat/    # MIRcat laser module
│       │   ├── __init__.py
│       │   ├── controller.py
│       │   ├── routes.py
│       │   ├── utils.py
│       │   └── sdk/
│       └── [additional modules...]
├── requirements.txt            # Python dependencies
└── venv/                      # Virtual environment
```

### Module Architecture Pattern

Each hardware module follows a consistent internal structure:

#### Controller Layer (`controller.py`)
The controller implements the core device logic and maintains the device state. It provides high-level methods for device operations while abstracting the low-level communication details.

**Key Responsibilities**:
- Device connection management
- Command execution and response handling
- State tracking and validation
- Error handling and recovery
- Configuration loading from TOML files

**Example Controller Interface**:
```python
class DeviceController:
    def __init__(self, config_path=None)
    def connect() -> bool
    def disconnect() -> None
    def get_status() -> Dict[str, Any]
    def execute_command(command, parameters) -> Any
    def __enter__() / __exit__()  # Context manager support
```

#### Routes Layer (`routes.py`)
The routes layer defines RESTful API endpoints specific to each device. It handles HTTP request/response processing and delegates business logic to the controller.

**Key Responsibilities**:
- HTTP request validation
- Parameter parsing and validation
- Controller method invocation
- Response formatting
- Error handling and status codes

**URL Pattern**: `/api/{device_name}/{operation}`

#### Utilities Layer (`utils.py`)
Device-specific utility functions, data parsers, and helper methods that support the controller and routes layers.

#### SDK Integration (`sdk/`)
Contains vendor-provided SDKs, drivers, and library files specific to each device. This isolation prevents conflicts between different device dependencies.

### Dynamic Module Discovery

The main application (`main.py`) implements automatic module discovery and registration:

```python
def discover_and_register_modules():
    """Dynamically discover and register all hardware module blueprints"""
    modules_dir = Path(__file__).parent / 'modules'
    
    for module_path in modules_dir.iterdir():
        if module_path.is_dir() and not module_path.name.startswith('__'):
            # Import and register module routes
            routes_module = importlib.import_module(f"src.modules.{module_name}.routes")
            blueprint = getattr(routes_module, f"{module_name}_bp")
            app.register_blueprint(blueprint)
```

This approach ensures that:
- New modules are automatically discovered without code changes
- Module loading failures don't crash the entire application
- Each module can be developed and tested independently

### Configuration Management

The backend uses TOML configuration files for hardware settings:

```toml
[device_name]
connection_type = "USB"
port = "COM3"
baud_rate = 115200
timeout = 2.0

[device_name.parameters]
parameter1 = value1
parameter2 = value2
```

Controllers load their configuration during initialization, allowing for easy deployment across different hardware setups without code changes.

## Frontend Architecture

### Directory Structure Deep Dive

The frontend mirrors the backend's modular structure while maintaining React best practices:

```
frontend/src/
├── App.jsx                     # Main application and routing
├── main.jsx                    # Application entry point
├── components/                 # Global shared components
│   ├── Navbar.jsx             # Navigation component
│   ├── StatusBar.jsx          # System status display
│   └── ui/                    # shadcn/ui components
├── modules/                   # Hardware device UI modules
│   ├── ArduinoUnoR4/          # Arduino module UI
│   │   ├── ArduinoUnoR4View.jsx    # Main component
│   │   ├── api.js             # Backend API calls
│   │   ├── ArduinoUnoR4.module.css # Scoped styles
│   │   └── components/        # Module-specific components
│   │       ├── ConnectionPanel.jsx
│   │       └── PositionControl.jsx
│   └── [additional modules...]
├── hooks/                     # Custom React hooks
├── lib/                       # Utility functions
└── assets/                    # Static assets
```

### Module UI Architecture Pattern

Each frontend module follows a consistent pattern:

#### Main View Component (`{Module}View.jsx`)
The primary component that assembles the complete UI for a hardware device. It manages state, handles user interactions, and coordinates with child components.

**Key Responsibilities**:
- State management for device status and user inputs
- API communication coordination
- Error handling and user feedback
- Layout and component composition

#### API Layer (`api.js`)
Dedicated module for all backend communication, providing a clean interface between UI components and the REST API.

**Key Responsibilities**:
- HTTP request/response handling
- Request parameter formatting
- Response data parsing
- Error handling and retry logic

#### Scoped Styling (`{Module}.module.css`)
CSS modules provide component-scoped styling to prevent style conflicts between modules.

#### Module-specific Components (`components/`)
Reusable UI components that are specific to a particular hardware module, such as specialized controls or displays.

### Central Integration

#### Application Router (`App.jsx`)
The main application component sets up routing and provides the overall layout structure:

```jsx
<Router>
  <Navbar />
  <Routes>
    <Route path="/arduino" element={<ArduinoUnoR4View />} />
    <Route path="/mircat" element={<DaylightMIRcatView />} />
    {/* Additional routes */}
  </Routes>
  <StatusBar />
</Router>
```

#### Global Components
- **Navbar**: Provides navigation between different hardware modules
- **StatusBar**: Displays system-wide status information and connection states

## Data Flow

### Typical User Interaction Flow

1. **User Action**: User clicks a button or enters data in the frontend
2. **State Update**: React component updates local state
3. **API Call**: Component calls appropriate API function from `api.js`
4. **HTTP Request**: Frontend sends HTTP request to backend endpoint
5. **Route Handler**: Flask route receives and validates request
6. **Controller Invocation**: Route handler calls controller method
7. **Hardware Communication**: Controller communicates with physical device
8. **Response Generation**: Controller returns result to route handler
9. **HTTP Response**: Flask sends JSON response to frontend
10. **State Update**: Frontend updates component state with response data
11. **UI Update**: React re-renders components with new state

### Error Propagation

Errors are handled at multiple levels:

- **Hardware Level**: Device communication errors
- **Controller Level**: Logic and validation errors
- **Route Level**: HTTP and parameter errors
- **API Level**: Network and response errors
- **Component Level**: UI state and user feedback errors

Each level provides appropriate error handling and passes meaningful error information up the chain.

### Real-time Updates

For real-time status monitoring, the system implements:

- **Polling**: Frontend periodically requests status updates
- **WebSocket Support**: (Future enhancement) Real-time bidirectional communication
- **Event-driven Updates**: Status changes trigger immediate UI updates

## Module Development Guide

### Adding a New Hardware Device

To add a new hardware device to the system, follow these steps:

#### Backend Module Development

1. **Create Module Directory**:
   ```bash
   mkdir backend/src/modules/new_device
   cd backend/src/modules/new_device
   ```

2. **Implement Controller** (`controller.py`):
   ```python
   class NewDeviceController:
       def __init__(self, config_path=None):
           self.config = self._load_config(config_path)
           self.connection = None
           self.is_connected = False
       
       def connect(self) -> bool:
           # Implement device connection logic
           pass
       
       def disconnect(self) -> None:
           # Implement disconnection logic
           pass
       
       def get_status(self) -> Dict[str, Any]:
           # Return device status information
           pass
   ```

3. **Implement Routes** (`routes.py`):
   ```python
   from flask import Blueprint, jsonify, request
   from .controller import NewDeviceController
   
   new_device_bp = Blueprint('new_device', __name__, url_prefix='/api/new_device')
   controller = NewDeviceController()
   
   @new_device_bp.route('/connect', methods=['POST'])
   def connect():
       # Implement connection endpoint
       pass
   ```

4. **Add Configuration** to `hardware_configuration.toml`:
   ```toml
   [new_device]
   connection_type = "USB"
   port = "COM4"
   # Additional device-specific parameters
   ```

#### Frontend Module Development

1. **Create Module Directory**:
   ```bash
   mkdir frontend/src/modules/NewDevice
   cd frontend/src/modules/NewDevice
   ```

2. **Implement Main View** (`NewDeviceView.jsx`):
   ```jsx
   import React, { useState, useEffect } from 'react';
   import * as api from './api';
   
   const NewDeviceView = () => {
       const [status, setStatus] = useState(null);
       
       useEffect(() => {
           loadStatus();
       }, []);
       
       const loadStatus = async () => {
           const response = await api.getStatus();
           setStatus(response.data);
       };
       
       return (
           <div>
               {/* Implement UI components */}
           </div>
       );
   };
   
   export default NewDeviceView;
   ```

3. **Implement API Layer** (`api.js`):
   ```javascript
   const API_BASE = '/api/new_device';
   
   export const connect = async () => {
       return apiRequest('/connect', { method: 'POST' });
   };
   
   export const getStatus = async () => {
       return apiRequest('/status', { method: 'GET' });
   };
   ```

4. **Add Route** to `App.jsx`:
   ```jsx
   import NewDeviceView from './modules/NewDevice/NewDeviceView';
   
   <Route path="/new-device" element={<NewDeviceView />} />
   ```

5. **Update Navigation** in `Navbar.jsx`:
   ```jsx
   { path: '/new-device', label: 'New Device', icon: SomeIcon }
   ```

### Testing New Modules

1. **Backend Testing**:
   ```bash
   cd backend
   source venv/bin/activate
   python -m pytest tests/test_new_device.py
   ```

2. **Frontend Testing**:
   ```bash
   cd frontend
   npm test NewDevice
   ```

3. **Integration Testing**:
   - Start both backend and frontend servers
   - Navigate to the new device module
   - Test all functionality with mock or real hardware

## Configuration Management

### Hardware Configuration Structure

The `hardware_configuration.toml` file provides centralized configuration for all hardware devices:

```toml
# Global system settings
[system]
data_directory = "/path/to/data"
log_level = "INFO"
experiment_timeout = 3600

[system.synchronization]
master_clock = "quantum_composers_9524"
trigger_mode = "external"
repetition_rate = 1000

# Device-specific configurations
[device_name]
device_type = "Device Model"
connection_type = "USB"
port = "COM3"
description = "Device description"

[device_name.parameters]
parameter1 = value1
parameter2 = value2

[device_name.control_parameters]
feature1 = true
feature2 = false
```

### Configuration Loading Pattern

Controllers load configuration using a consistent pattern:

```python
def _load_config(self, config_path=None):
    if config_path is None:
        project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))
        config_path = os.path.join(project_root, "hardware_configuration.toml")
    
    with open(config_path, 'r') as f:
        config = toml.load(f)
    return config.get('device_name', {})
```

### Environment-specific Configuration

For different deployment environments, configuration can be overridden using environment variables:

```python
port = os.getenv('DEVICE_PORT', config.get('port', 'COM3'))
```

## Communication Protocols

### Device Communication Patterns

The system supports multiple communication protocols:

#### Serial Communication (Arduino, Signal Generator)
```python
import serial

connection = serial.Serial(
    port=config['port'],
    baudrate=config['baud_rate'],
    timeout=config['timeout']
)

# Command/response pattern
connection.write(b"COMMAND\n")
response = connection.readline().decode().strip()
```

#### USB SDK Communication (PicoScope, MIRcat)
```python
# Device-specific SDK integration
from .sdk import device_sdk

device = device_sdk.Device()
device.connect()
result = device.execute_command(parameters)
```

#### Network Communication (Zurich Instruments)
```python
# LabOne API integration
import zhinst.core

daq = zhinst.core.ziDAQServer('localhost', 8004)
device = daq.connectDevice(device_id)
```

### Error Handling Patterns

Consistent error handling across all communication protocols:

```python
try:
    result = device.execute_command(command)
    return {"status": "success", "data": result}
except DeviceError as e:
    logger.error(f"Device error: {e}")
    return {"status": "error", "message": str(e)}
except Exception as e:
    logger.error(f"Unexpected error: {e}")
    return {"status": "error", "message": "Internal error"}
```

## Error Handling

### Backend Error Handling Strategy

#### Exception Hierarchy
```python
class SpectroscopyError(Exception):
    """Base exception for spectroscopy system"""
    pass

class DeviceError(SpectroscopyError):
    """Device communication or operation error"""
    pass

class ConfigurationError(SpectroscopyError):
    """Configuration loading or validation error"""
    pass

class ValidationError(SpectroscopyError):
    """Parameter validation error"""
    pass
```

#### Error Response Format
All API endpoints return consistent error responses:

```json
{
    "status": "error",
    "message": "Human-readable error description",
    "error_code": "DEVICE_CONNECTION_FAILED",
    "details": {
        "device": "arduino_uno_r4",
        "port": "COM3",
        "timestamp": "2025-08-08T10:00:00Z"
    }
}
```

### Frontend Error Handling Strategy

#### Error State Management
```jsx
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

const handleOperation = async () => {
    setLoading(true);
    setError(null);
    
    try {
        const result = await api.performOperation();
        // Handle success
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};
```

#### User Feedback Components
```jsx
{error && (
    <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
    </Alert>
)}
```

## Security Considerations

### API Security

- **CORS Configuration**: Properly configured for development and production
- **Input Validation**: All user inputs validated before processing
- **Error Information**: Sensitive information not exposed in error messages
- **Rate Limiting**: (Future enhancement) Prevent API abuse

### Hardware Access Security

- **Device Permissions**: Proper file permissions for device access
- **Connection Validation**: Verify device identity before operations
- **Command Validation**: Validate all commands before sending to hardware

### Configuration Security

- **File Permissions**: Configuration files protected from unauthorized access
- **Sensitive Data**: No passwords or secrets in configuration files
- **Environment Variables**: Sensitive configuration via environment variables

## Performance Optimization

### Backend Performance

#### Connection Pooling
Maintain persistent connections to hardware devices to reduce connection overhead:

```python
class DeviceController:
    def __init__(self):
        self._connection_pool = {}
    
    def get_connection(self, device_id):
        if device_id not in self._connection_pool:
            self._connection_pool[device_id] = self._create_connection(device_id)
        return self._connection_pool[device_id]
```

#### Asynchronous Operations
Use async/await for non-blocking hardware operations:

```python
import asyncio

async def execute_command_async(self, command):
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(None, self._execute_command_sync, command)
    return result
```

#### Caching
Cache frequently accessed device status and configuration:

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def get_device_capabilities(self, device_id):
    return self._query_device_capabilities(device_id)
```

### Frontend Performance

#### Component Optimization
Use React.memo and useMemo for expensive computations:

```jsx
const DeviceStatus = React.memo(({ status }) => {
    const formattedStatus = useMemo(() => {
        return formatStatusData(status);
    }, [status]);
    
    return <div>{formattedStatus}</div>;
});
```

#### API Request Optimization
Implement request debouncing and caching:

```jsx
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        
        return () => clearTimeout(handler);
    }, [value, delay]);
    
    return debouncedValue;
};
```

## Testing Strategy

### Backend Testing

#### Unit Tests
Test individual controller methods:

```python
import pytest
from unittest.mock import Mock, patch

class TestArduinoController:
    def test_connect_success(self):
        controller = ArduinoController()
        with patch('serial.Serial') as mock_serial:
            mock_serial.return_value.readline.return_value = b"PONG\n"
            assert controller.connect() == True
    
    def test_set_mux_position(self):
        controller = ArduinoController()
        controller.connection = Mock()
        controller.is_connected = True
        
        result = controller.set_mux_position(3)
        assert result == True
```

#### Integration Tests
Test complete API endpoints:

```python
def test_arduino_connect_endpoint(client):
    response = client.post('/api/arduino/connect')
    assert response.status_code == 200
    assert response.json['status'] == 'success'
```

#### Hardware Mock Testing
Create mock hardware interfaces for testing without physical devices:

```python
class MockArduino:
    def __init__(self):
        self.position = 1
    
    def write(self, command):
        if command == b"MUX 3\n":
            self.position = 3
    
    def readline(self):
        return f"MUX_SET {self.position}\n".encode()
```

### Frontend Testing

#### Component Tests
Test React components with React Testing Library:

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import ArduinoUnoR4View from './ArduinoUnoR4View';

test('connects to Arduino when connect button clicked', async () => {
    render(<ArduinoUnoR4View />);
    
    const connectButton = screen.getByText('Connect');
    fireEvent.click(connectButton);
    
    expect(await screen.findByText('Connected')).toBeInTheDocument();
});
```

#### API Tests
Test API communication with mock responses:

```jsx
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.post('/api/arduino/connect', (req, res, ctx) => {
        return res(ctx.json({ status: 'success', connected: true }));
    })
);
```

### End-to-End Testing

#### Cypress Tests
Test complete user workflows:

```javascript
describe('Arduino Control', () => {
    it('should connect and control MUX position', () => {
        cy.visit('/arduino');
        cy.get('[data-testid=connect-button]').click();
        cy.get('[data-testid=status-badge]').should('contain', 'Connected');
        
        cy.get('[data-testid=position-select]').select('3');
        cy.get('[data-testid=set-position-button]').click();
        cy.get('[data-testid=current-position]').should('contain', '3');
    });
});
```

---

This architecture documentation provides the foundation for understanding, maintaining, and extending the IR Pump-Probe Spectroscopy Control Interface. The modular design ensures that the system can grow and adapt to new requirements while maintaining reliability and usability.

