# AI Agent Development Instructions

## Project Overview

This document serves as the master instruction set for AI agents working on the IR Pump-Probe Spectroscopy Control Interface project. It contains detailed phase-by-phase instructions, architectural principles, and development guidelines.

## Project Goal

Develop a robust, user-friendly application to control and synchronize all electronic components of a Pump-Probe IR Spectroscopy system. The application features a Python backend for hardware control and a modern React frontend to create an intuitive graphical user interface with panels for each instrument, and a sophisticated "Experiment" mode for orchestrating automated data acquisition runs using an "acquire-then-display" workflow.

## Core Technologies

- **Backend**: Python (FastAPI/Flask), PySerial, PyVISA, hardware-specific SDKs
- **Frontend**: React (TypeScript), Tailwind CSS, shadcn/ui components
- **Version Control**: Git, hosted on GitHub
- **Configuration**: TOML files for hardware parameters

## Hardware Components

1. **Arduino Uno R4 Minima**: MUX controller for sample positioning (USB)
2. **Continuum Nd:YAG Laser (Surelite)**: Pump source (TTL controlled via Signal Generator)
3. **Daylight MIRcat Laser**: Probe source (USB)
4. **PicoScope 5244D**: Oscilloscope for alignment, calibration, and data collection (USB)
5. **Quantum Composers 9524**: Signal Generator for system synchronization (USB)
6. **Zurich HF2LI**: Lock-in Amplifier for data collection (USB)

## Development Phases

### Phase 0: Project Structure ✅ COMPLETE

**Objective**: Establish project foundation and modular architecture

**Completed Tasks**:
- Repository setup and documentation analysis
- Modular backend architecture with dynamic module loading
- Modular frontend architecture with React routing
- Hardware configuration system using TOML
- Example Arduino module implementation (backend and frontend)
- Comprehensive project documentation

**Deliverables**:
- Complete project structure
- Working Arduino module example
- Configuration templates
- Development documentation

### Phase 1: Hardware Module Development 🚧 NEXT

**Objective**: Implement individual control modules for each hardware device

**Tasks**:
1. **Continuum Nd:YAG Laser Module**
   - Backend controller for TTL signal coordination
   - Routes for laser control via Signal Generator
   - Frontend interface for laser parameters
   - Safety interlocks and status monitoring

2. **Daylight MIRcat Laser Module**
   - Backend controller using MIRcat SDK
   - Wavelength control and scanning
   - Power management and safety features
   - Frontend interface with wavelength selection

3. **PicoScope 5244D Module**
   - Backend controller using PicoSDK
   - Data acquisition and streaming
   - Trigger configuration
   - Frontend interface with real-time plotting

4. **Quantum Composers 9524 Module**
   - Backend controller for signal generation
   - TTL output control for laser synchronization
   - Timing and delay configuration
   - Frontend interface for pulse programming

5. **Zurich HF2LI Module**
   - Backend controller using LabOne API
   - Lock-in amplifier configuration
   - Data acquisition and processing
   - Frontend interface with parameter controls

**Development Guidelines**:
- Follow the modular architecture established in Phase 0
- Each module must be self-contained with its own controller, routes, and UI
- Implement comprehensive error handling and status monitoring
- Use the hardware configuration system for device parameters
- Follow the established API patterns and naming conventions

### Phase 2: Experiment Automation 📋 PLANNED

**Objective**: Implement synchronized experiment control and automation

**Tasks**:
1. **Experiment Sequence Builder**
   - Visual sequence programming interface
   - Parameter sweep configuration
   - Timing and synchronization setup
   - Experiment validation and preview

2. **Synchronized Data Acquisition**
   - Coordinated control of all hardware devices
   - Real-time data collection and storage
   - Experiment progress monitoring
   - Error handling and recovery

3. **Data Visualization and Analysis**
   - Real-time plotting and visualization
   - Data export and analysis tools
   - Experiment result comparison
   - Report generation

4. **Advanced Features**
   - Automated parameter optimization
   - Machine learning integration
   - Remote monitoring capabilities
   - Experiment scheduling

## Architectural Principles

### Backend Architecture

**Modular Design**: Each hardware device is implemented as a self-contained Python package in `backend/src/modules/`. Each module contains:

- `controller.py`: Device control logic and state management
- `routes.py`: Flask blueprint with API endpoints
- `utils.py`: Helper functions and utilities
- `sdk/`: Device-specific SDK files and drivers

**Dynamic Module Loading**: The main application (`main.py`) automatically discovers and registers all modules, allowing new devices to be added without modifying existing code.

**Configuration Management**: Hardware parameters are externalized in `hardware_configuration.toml`, allowing deployment across different setups without code changes.

**Error Handling**: Comprehensive error handling at all levels with consistent error response formats.

### Frontend Architecture

**Component Modularity**: Each hardware device has its own UI module in `frontend/src/modules/` containing:

- `{Device}View.jsx`: Main component for the device interface
- `api.js`: Backend communication functions
- `{Device}.module.css`: Scoped styling
- `components/`: Device-specific UI components

**Routing System**: React Router provides navigation between device modules with a central navigation bar.

**State Management**: Local component state with React hooks, with plans for global state management as complexity grows.

**API Communication**: Consistent API patterns using fetch with error handling and loading states.

## Development Standards

### Code Quality

**Python Backend**:
- Follow PEP 8 style guidelines
- Use type hints for function parameters and return values
- Implement comprehensive docstrings
- Use pytest for unit and integration testing
- Maintain 80%+ test coverage

**React Frontend**:
- Use functional components with hooks
- Implement PropTypes or TypeScript for type checking
- Follow React best practices for performance
- Use React Testing Library for component testing
- Maintain consistent naming conventions

### API Design

**RESTful Endpoints**: All API endpoints follow REST conventions:
- `GET /api/{device}/status` - Get device status
- `POST /api/{device}/connect` - Connect to device
- `POST /api/{device}/disconnect` - Disconnect from device
- `GET /api/{device}/{parameter}` - Get parameter value
- `POST /api/{device}/{parameter}` - Set parameter value

**Response Format**: Consistent JSON response format:
```json
{
    "status": "success|error",
    "message": "Human-readable message",
    "data": { /* Response data */ },
    "timestamp": "ISO 8601 timestamp"
}
```

**Error Handling**: Standardized error responses with appropriate HTTP status codes.

### Configuration Management

**Hardware Configuration**: Use `hardware_configuration.toml` for all device parameters:
```toml
[device_name]
connection_type = "USB"
port = "COM3"
description = "Device description"

[device_name.parameters]
parameter1 = value1
parameter2 = value2
```

**Environment Variables**: Use environment variables for deployment-specific settings.

## Testing Strategy

### Backend Testing

**Unit Tests**: Test individual controller methods and utility functions
**Integration Tests**: Test complete API endpoints with mock hardware
**Hardware Tests**: Test with actual hardware when available

### Frontend Testing

**Component Tests**: Test React components with React Testing Library
**API Tests**: Test API communication with mock responses
**E2E Tests**: Test complete user workflows with Cypress

### Continuous Integration

**Automated Testing**: Run all tests on every commit
**Code Quality**: Enforce linting and formatting standards
**Documentation**: Ensure documentation stays current with code changes

## Security Considerations

### API Security
- Input validation on all endpoints
- Rate limiting to prevent abuse
- Proper error handling without information leakage
- CORS configuration for development and production

### Hardware Access
- Device permission management
- Connection validation and authentication
- Command validation before hardware execution
- Safe shutdown procedures

### Configuration Security
- No sensitive data in configuration files
- Environment variables for secrets
- Proper file permissions on configuration files

## Performance Optimization

### Backend Performance
- Connection pooling for hardware devices
- Asynchronous operations for non-blocking hardware communication
- Caching for frequently accessed data
- Efficient data structures for real-time operations

### Frontend Performance
- Component memoization for expensive operations
- Lazy loading for large modules
- Efficient state updates to minimize re-renders
- Optimized API request patterns

## Deployment Strategy

### Development Environment
- Local development with mock hardware interfaces
- Hot reloading for both backend and frontend
- Comprehensive logging and debugging tools

### Production Environment
- Containerized deployment with Docker
- Environment-specific configuration
- Monitoring and alerting systems
- Backup and recovery procedures

## Documentation Requirements

### Code Documentation
- Comprehensive docstrings for all functions and classes
- Inline comments for complex logic
- API documentation with examples
- Architecture decision records (ADRs)

### User Documentation
- Installation and setup guides
- User manuals for each hardware module
- Troubleshooting guides
- FAQ and common issues

### Developer Documentation
- Contribution guidelines
- Development environment setup
- Testing procedures
- Release processes

## Agent Development Workflow

### Starting a Development Session

1. **Review Current State**:
   - Read this document thoroughly
   - Check the current phase status
   - Review any open issues or tasks

2. **Environment Setup**:
   - Clone the repository
   - Set up development environment
   - Verify all dependencies are installed

3. **Task Selection**:
   - Choose tasks from the current phase
   - Prioritize based on dependencies and complexity
   - Break down large tasks into smaller components

### Development Process

1. **Planning**:
   - Create detailed implementation plan
   - Identify required resources and dependencies
   - Estimate time and complexity

2. **Implementation**:
   - Follow established architectural patterns
   - Implement comprehensive error handling
   - Write tests alongside code
   - Document all changes

3. **Testing**:
   - Run all existing tests
   - Add new tests for new functionality
   - Test with mock and real hardware when possible
   - Verify integration with existing modules

4. **Documentation**:
   - Update relevant documentation
   - Add code comments and docstrings
   - Update API documentation
   - Create user guides if needed

### Quality Assurance

**Code Review Checklist**:
- [ ] Follows established architectural patterns
- [ ] Implements proper error handling
- [ ] Includes comprehensive tests
- [ ] Has appropriate documentation
- [ ] Follows coding standards
- [ ] Integrates properly with existing code

**Testing Checklist**:
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Performance impact assessed
- [ ] Security implications reviewed

## Common Patterns and Examples

### Backend Controller Pattern

```python
class DeviceController:
    def __init__(self, config_path=None):
        self.config = self._load_config(config_path)
        self.connection = None
        self.is_connected = False
    
    def connect(self) -> bool:
        """Connect to device"""
        try:
            # Implementation specific to device
            self.connection = create_connection(self.config)
            self.is_connected = True
            return True
        except Exception as e:
            logger.error(f"Connection failed: {e}")
            return False
    
    def get_status(self) -> Dict[str, Any]:
        """Get device status"""
        return {
            "connected": self.is_connected,
            "device_type": self.config.get('device_type'),
            # Additional status information
        }
```

### Frontend Component Pattern

```jsx
const DeviceView = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        loadStatus();
    }, []);
    
    const loadStatus = async () => {
        try {
            setLoading(true);
            const response = await api.getStatus();
            setStatus(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div>
            {/* Component implementation */}
        </div>
    );
};
```

### API Communication Pattern

```javascript
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE}${endpoint}`;
    const defaultOptions = {
        headers: { 'Content-Type': 'application/json' },
    };
    
    try {
        const response = await fetch(url, { ...defaultOptions, ...options });
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error(`API request failed for ${url}:`, error);
        throw error;
    }
};
```

## Troubleshooting Guide

### Common Development Issues

**Module Not Loading**:
- Check module directory structure
- Verify `__init__.py` files exist
- Check for syntax errors in module files
- Verify blueprint naming convention

**Hardware Connection Issues**:
- Check device drivers are installed
- Verify COM port assignments
- Check device permissions (Linux/macOS)
- Test with vendor software first

**Frontend Build Errors**:
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify import paths are correct
- Check for TypeScript errors

**API Communication Errors**:
- Verify backend server is running
- Check CORS configuration
- Verify API endpoint URLs
- Check network connectivity

### Performance Issues

**Slow Hardware Response**:
- Check connection timeouts
- Implement connection pooling
- Use asynchronous operations
- Optimize command sequences

**Frontend Lag**:
- Implement component memoization
- Optimize state updates
- Use lazy loading for large components
- Profile component render times

## Future Enhancements

### Phase 3: Advanced Features (Future)

**Machine Learning Integration**:
- Automated parameter optimization
- Predictive maintenance
- Anomaly detection
- Intelligent experiment design

**Remote Access**:
- Web-based remote control
- Mobile application
- Cloud data storage
- Collaborative features

**Advanced Visualization**:
- 3D data visualization
- Real-time analysis
- Interactive plotting
- Custom dashboard creation

### Scalability Considerations

**Multi-User Support**:
- User authentication and authorization
- Session management
- Concurrent access control
- Audit logging

**Distributed Systems**:
- Microservices architecture
- Message queuing systems
- Load balancing
- High availability design

## Conclusion

This document provides the complete roadmap for developing the IR Pump-Probe Spectroscopy Control Interface. Agents should follow these instructions carefully to ensure consistency, quality, and maintainability of the codebase.

For questions or clarifications, refer to the ARCHITECTURE.md document for technical details or the README.md for general project information.

---

**Document Version**: 1.0  
**Last Updated**: August 2025  
**Next Review**: After Phase 1 completion

