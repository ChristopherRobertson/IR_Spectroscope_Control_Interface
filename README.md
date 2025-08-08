# IR Pump-Probe Spectroscopy Control Interface

A unified control interface for IR pump-probe spectroscopy systems, featuring a modular Python backend and React frontend for comprehensive hardware management and automated experiment orchestration.

## Overview

This project provides a robust, user-friendly application to control and synchronize all electronic components of a pump-probe IR spectroscopy system. The application features a Python backend for hardware control and a modern React frontend to create an intuitive graphical user interface with panels for each instrument, and a sophisticated "Experiment" mode for orchestrating automated data acquisition runs.

## Key Features

- **Modular Architecture**: Self-contained modules for each hardware device
- **Individual Device Control**: Dedicated interfaces for each instrument
- **Synchronized Experiment Automation**: Coordinated control of all system components
- **Real-time Data Visualization**: Live plotting and analysis capabilities
- **Cross-platform Compatibility**: Supports Windows, macOS, and Linux
- **Web-based Interface**: Modern React frontend with responsive design
- **RESTful API**: Clean separation between frontend and backend

## Technology Stack

### Backend
- **Python 3.11+** - Core application logic
- **Flask** - Web framework and API server
- **PySerial** - Serial communication with hardware
- **TOML** - Configuration management
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - User interface framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **Lucide Icons** - Icon library

## Hardware Components

The system controls six primary hardware components:

1. **Arduino Uno R4 Minima** - MUX controller for sample positioning
2. **Continuum Nd:YAG Laser (Surelite)** - Pump source (TTL controlled)
3. **Daylight MIRcat Laser** - Mid-IR tunable probe source
4. **PicoScope 5244D** - 4-channel oscilloscope for data collection
5. **Quantum Composers 9524** - Signal generator for system synchronization
6. **Zurich HF2LI** - Lock-in amplifier for signal processing

## Project Structure

```
IR_Spectroscope_Control_Interface/
├── README.md                    # This file
├── ARCHITECTURE.md              # Detailed architectural documentation
├── ACTION_REQUIRED.md           # User action items and missing information
├── AGENT_INSTRUCTIONS.md        # AI agent development instructions
├── hardware_configuration.toml  # Hardware configuration file
├── .gitignore                   # Git ignore rules
│
├── docs/                        # Documentation and manuals
│   ├── README.md               # Documentation organization guide
│   ├── manuals/                # Hardware manuals and user guides
│   ├── sdks/                   # Software development kits
│   ├── examples/               # Example code and configurations
│   └── specifications/         # Technical specifications
│
├── backend/                     # Python Flask backend
│   ├── src/
│   │   ├── main.py             # Main application entry point
│   │   └── modules/            # Hardware device modules
│   │       ├── arduino_uno_r4/
│   │       ├── continuum_ndyag/
│   │       ├── daylight_mircat/
│   │       ├── picoscope_5244d/
│   │       ├── quantum_composers_9524/
│   │       └── zurich_hf2li/
│   ├── requirements.txt        # Python dependencies
│   └── venv/                   # Virtual environment
│
└── frontend/                    # React frontend
    ├── src/
    │   ├── App.jsx             # Main application component
    │   ├── components/         # Global shared components
    │   └── modules/            # Hardware device UI modules
    │       ├── ArduinoUnoR4/
    │       ├── ContinuumNdYAG/
    │       ├── DaylightMIRcat/
    │       ├── PicoScope5244D/
    │       ├── QuantumComposers9524/
    │       ├── ZurichHF2LI/
    │       └── Experiment/
    ├── package.json            # Node.js dependencies
    └── public/                 # Static assets
```

## Installation and Setup

### Prerequisites

- **Python 3.11+** with pip
- **Node.js 18+** with npm/pnpm
- **Git** for version control
- **Hardware drivers and SDKs** (see ACTION_REQUIRED.md)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure hardware settings:
   - Edit `hardware_configuration.toml` with your specific hardware parameters
   - See ACTION_REQUIRED.md for required information

5. Start the backend server:
   ```bash
   python src/main.py
   ```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm run dev
   ```

The frontend will be available at `http://localhost:5173`

## Configuration

### Hardware Configuration

Edit the `hardware_configuration.toml` file to match your specific hardware setup:

```toml
[arduino_uno_r4]
port = "COM3"  # Adjust for your system
baud_rate = 115200

[daylight_mircat]
sdk_path = "PATH_TO_MIRCAT_SDK"

[picoscope_5244d]
sdk_path = "PATH_TO_PICOSDK"

# ... additional device configurations
```

### Environment Variables

The system uses the following environment variables:

- `FLASK_ENV` - Set to `development` for debug mode
- `FLASK_PORT` - Backend server port (default: 5000)
- `VITE_API_BASE` - Frontend API base URL (default: http://localhost:5000)

## Usage

### Individual Device Control

1. Start both backend and frontend servers
2. Navigate to the web interface at `http://localhost:5173`
3. Use the navigation bar to access individual device controls
4. Connect to devices using the connection controls in each module
5. Operate devices through their respective interfaces

### Experiment Mode (Phase 2)

The experiment mode will provide:
- Automated sequence programming
- Synchronized data acquisition
- Real-time data visualization
- Experiment parameter optimization

*Note: Experiment mode is planned for Phase 2 development*

## Development Status

### Phase 0: Project Structure ✅ Complete
- [x] Repository setup and documentation analysis
- [x] Modular backend architecture implementation
- [x] Modular frontend architecture implementation
- [x] Arduino Uno R4 module implementation (example)
- [x] Project documentation and configuration

### Phase 1: Hardware Module Development 🚧 Pending
- [ ] Continuum Nd:YAG laser control module
- [ ] Daylight MIRcat laser control module
- [ ] PicoScope 5244D oscilloscope module
- [ ] Quantum Composers 9524 signal generator module
- [ ] Zurich HF2LI lock-in amplifier module

### Phase 2: Experiment Automation 📋 Planned
- [ ] Experiment sequence builder
- [ ] Synchronized data acquisition
- [ ] Real-time data visualization
- [ ] Automated parameter optimization

## API Documentation

### Backend API Endpoints

The backend provides RESTful API endpoints for each hardware module:

#### System Endpoints
- `GET /api/health` - System health check
- `GET /api/modules` - List available modules
- `GET /api/system/info` - System information

#### Arduino Module (Example)
- `POST /api/arduino/connect` - Connect to Arduino
- `POST /api/arduino/disconnect` - Disconnect from Arduino
- `GET /api/arduino/status` - Get device status
- `GET /api/arduino/mux/position` - Get current MUX position
- `POST /api/arduino/mux/position` - Set MUX position

*Additional module endpoints will be documented as they are implemented*

## Contributing

### Development Workflow

1. Create a feature branch from `main`
2. Implement changes following the modular architecture
3. Test locally with hardware (if available) or mock interfaces
4. Update documentation as needed
5. Submit a pull request for review

### Adding New Hardware Modules

To add a new hardware device:

1. **Backend Module**:
   - Create directory in `backend/src/modules/device_name/`
   - Implement `controller.py` with device logic
   - Implement `routes.py` with API endpoints
   - Add SDK files to `sdk/` subdirectory

2. **Frontend Module**:
   - Create directory in `frontend/src/modules/DeviceName/`
   - Implement `DeviceNameView.jsx` with UI components
   - Implement `api.js` with backend communication
   - Add route to `App.jsx`

3. **Configuration**:
   - Add device section to `hardware_configuration.toml`
   - Update documentation

## Troubleshooting

### Common Issues

**Backend server won't start**
- Check Python version (3.11+ required)
- Verify virtual environment is activated
- Install missing dependencies: `pip install -r requirements.txt`

**Frontend build errors**
- Check Node.js version (18+ required)
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Check for TypeScript errors in console

**Hardware connection failures**
- Verify device drivers are installed
- Check COM port assignments in Device Manager (Windows)
- Ensure hardware_configuration.toml has correct settings
- Check device permissions (Linux/macOS may require sudo)

**CORS errors in browser**
- Ensure Flask-CORS is installed and configured
- Check that backend is running on expected port
- Verify API base URL in frontend configuration

### Getting Help

1. Check the ACTION_REQUIRED.md file for setup requirements
2. Review the ARCHITECTURE.md file for technical details
3. Consult hardware manuals in the docs/ directory
4. Check the GitHub issues for known problems

## License

This project is developed for research and educational purposes. Please consult with your institution regarding licensing and distribution requirements.

## Acknowledgments

- **Pico Technology** for PicoScope SDK and documentation
- **Zurich Instruments** for LabOne API and programming resources
- **Daylight Solutions** for MIRcat laser control interfaces
- **Quantum Composers** for signal generator programming protocols
- **Arduino** for open-source hardware platform and development tools

---

**Project Status**: Phase 0 Complete - Ready for Phase 1 Development  
**Last Updated**: August 2025  
**Version**: 1.0.0

