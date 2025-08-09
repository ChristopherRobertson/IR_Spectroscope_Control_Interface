# ACTION REQUIRED - Phase 1A&B Complete, Phase 1C Preparation

## Overview

**Phase 1A (Global GUI Design Standards)** and **Phase 1B (UI Skeleton)** have been successfully completed. The application now features a modern dark theme, comprehensive navigation, and placeholder interfaces for all hardware devices. This document outlines the critical actions required from the user before proceeding with **Phase 1C (Individual Device Panel Development)**.

## Current Status

✅ **PHASE 0 COMPLETED**
- Project structure and modular architecture implemented
- Backend FastAPI application with dynamic module loading
- Frontend React TypeScript application with routing and navigation
- Arduino Uno R4 example module (backend and frontend)
- Hardware configuration template created
- Comprehensive documentation generated
- **ALL HARDWARE DOCUMENTATION PROVIDED** ✅
- **COMPLETE SDK AND REFERENCE MATERIALS AVAILABLE** ✅

✅ **PHASE 1A COMPLETED**
- MUI (Material-UI) dark theme implementation
- Global app context for state management
- Main layout with navigation and status bars
- Toast notification system
- TypeScript conversion completed

✅ **PHASE 1B COMPLETED**
- Dashboard view with device overview cards
- Placeholder views for all hardware devices
- Updated Arduino view with MUI theme
- Complete UI skeleton and component scaffolding
- Frontend application startup verified

🚧 **PHASE 1C PREPARATION REQUIRED**
- GUI screenshots from manufacturer software needed
- Hardware configuration updates for GUI parameters
- Physical hardware setup and testing
- SDK installation and driver setup

---

## CRITICAL ACTIONS FOR PHASE 1C

### 1. GUI Screenshots Collection

**Priority: CRITICAL** 🚨  
**Estimated Time: 1-2 hours**  
**Status: REQUIRED FOR PHASE 1C**

To develop accurate manufacturer-style control panels, screenshots of each device's native control software are required. These will guide the UI component design and parameter layout.

#### 1.1 Required Screenshots

**Daylight MIRcat Laser Control Software:**
- [ ] Main control interface showing wavelength tuning
- [ ] Power output controls and monitoring
- [ ] Temperature and system status displays
- [ ] Laser arming/disarming interface
- [ ] Wavelength scanning configuration

**PicoScope 5244D Software Interface:**
- [ ] Main oscilloscope display with waveforms
- [ ] Timebase and voltage range controls
- [ ] Trigger configuration interface
- [ ] Data capture and measurement tools
- [ ] Signal processing controls

**Quantum Composers 9524 Control Software:**
- [ ] Main pulse generator interface
- [ ] Channel configuration and timing controls
- [ ] Delay and width adjustment interface
- [ ] Output level and polarity settings
- [ ] Sequence programming interface

**Zurich HF2LI LabOne Interface:**
- [ ] Main lock-in amplifier display
- [ ] Reference frequency and phase controls
- [ ] Input range and sensitivity settings
- [ ] Time constant and filter configuration
- [ ] Real-time signal monitoring display

**Continuum Nd:YAG Laser (if applicable):**
- [ ] Any available control software interface
- [ ] TTL trigger monitoring displays
- [ ] System status and safety indicators

**Arduino Development Environment:**
- [ ] Serial monitor interface
- [ ] Any custom control software used

#### 1.2 Screenshot Guidelines

**File Naming Convention:**
- Use descriptive names: `mircat_main_interface.png`
- Include function: `picoscope_trigger_settings.png`
- Add device identifier: `zurich_signal_display.png`

**Quality Requirements:**
- High resolution (1920x1080 minimum)
- Clear, unobstructed interface views
- Include all relevant control elements
- Capture different operational states if possible

**Organization:**
- Place screenshots in: `docs/gui_screenshots/`
- Create subdirectories for each device if multiple screenshots
- Include brief descriptions in filenames

#### 1.3 Screenshot Collection Process

1. **Install and run each device's native control software**
2. **Connect to the hardware** (or use demo/simulation mode if available)
3. **Navigate to key control interfaces** and capture screenshots
4. **Document any special UI behaviors** or dynamic elements
5. **Save screenshots** in the designated directory structure

### 2. Hardware Configuration Updates for GUI

**Priority: HIGH** ⚠️  
**Estimated Time: 45 minutes**

Based on the GUI screenshots and manufacturer software analysis, additional parameters will need to be added to `hardware_configuration.toml` for accurate interface replication.

#### 2.1 GUI-Specific Parameters (To be updated after screenshot analysis)

The following sections will be added to the configuration file once screenshots are analyzed:

**Display and Layout Parameters:**
```toml
[device_name.gui]
# Main display parameters
main_display_type = "waveform" | "numeric" | "status"
control_layout = "tabbed" | "sidebar" | "grid"
color_scheme = "manufacturer_default" | "dark" | "custom"

# Control element specifications
primary_controls = ["param1", "param2", "param3"]
secondary_controls = ["param4", "param5"]
status_indicators = ["status1", "status2"]

# Update rates and refresh intervals
display_refresh_rate = 100  # milliseconds
status_update_rate = 1000   # milliseconds
```

**Device-Specific GUI Parameters:**
- **MIRcat**: Wavelength display format, power meter styling, temperature graphs
- **PicoScope**: Waveform display parameters, grid styling, measurement overlays
- **Quantum Composers**: Channel layout, timing diagram display, sequence visualization
- **Zurich HF2LI**: Signal display format, phase/amplitude plots, filter response graphs

#### 2.2 Current Configuration Status ✅

The following have been configured based on hardware documentation:
- Complete hardware specifications for all devices
- Communication parameters (baud rates, timeouts, etc.)
- Default operational parameters
- Safety limits and interlocks
- Channel assignments based on wiring diagram
- Experiment coordination parameters

#### 2.3 Local Environment Updates Still Required ⚠️

You still need to update the following for your specific environment:

**Arduino Uno R4 Minima:**
```toml
[arduino_uno_r4]
port = "COM3"  # UPDATE: Windows: "COM3", Linux: "/dev/ttyUSB0", macOS: "/dev/cu.usbmodem*"
```

**Daylight MIRcat:**
```toml
[daylight_mircat]
sdk_path = "C:/Program Files/Daylight Solutions/MIRcat SDK"  # UPDATE: Your actual SDK path
```

**PicoScope 5244D:**
```toml
[picoscope_5244d]
sdk_path = "C:/Program Files/Pico Technology/SDK"  # UPDATE: Your actual PicoSDK path
```

**Quantum Composers 9524:**
```toml
[quantum_composers_9524]
port = "COM4"  # UPDATE: Your actual COM port
```

**Zurich HF2LI:**
```toml
[zurich_hf2li]
device_id = "dev####"  # UPDATE: Your device serial number (found on device label)
labone_path = "C:/Program Files/Zurich Instruments/LabOne"  # UPDATE: Your LabOne path
```

### 3. Physical Hardware Setup

**Priority: HIGH**  
**Estimated Time: 2-3 hours**

#### 3.1 Hardware Connections
Ensure all devices are properly connected:

- [ ] Arduino Uno R4 connected via USB to computer
- [ ] Daylight MIRcat connected via USB to computer
- [ ] PicoScope 5244D connected via USB 3.0 to computer
- [ ] Quantum Composers 9524 connected via USB to computer
- [ ] Zurich HF2LI connected via USB to computer
- [ ] Continuum Nd:YAG laser connected to Quantum Composers TTL output

#### 3.2 Driver Installation
Install device drivers for:

- [ ] Arduino Uno R4 (usually automatic)
- [ ] PicoScope 5244D (from PicoSDK)
- [ ] Quantum Composers 9524 (from vendor)
- [ ] Zurich HF2LI (from LabOne package)
- [ ] Daylight MIRcat (from vendor SDK)

#### 3.3 Device Testing
Test each device individually:

- [ ] Arduino: Upload simple blink sketch to verify communication
- [ ] PicoScope: Run PicoScope software to verify connection
- [ ] Quantum Composers: Use vendor software to test signal generation
- [ ] Zurich HF2LI: Run LabOne software to verify connection
- [ ] MIRcat: Use vendor software to test laser communication

### 4. Software Environment Setup

**Priority: HIGH**  
**Estimated Time: 1 hour**

#### 4.1 Python Environment
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 4.2 Node.js Environment
```bash
cd frontend
pnpm install
```

#### 4.3 Test Application
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python src/main.py

# Terminal 2 - Frontend
cd frontend
pnpm run dev
```

Navigate to `http://localhost:5173` and verify the application loads with the new MUI dark theme.

---

## PHASE 1C DEVELOPMENT READINESS

### Prerequisites for Phase 1C

Before Phase 1C (Individual Device Panel Development) can begin:

1. **GUI Screenshots Collected** 📸
   - All manufacturer software interfaces captured
   - Screenshots organized in `docs/gui_screenshots/`
   - UI components and layouts documented

2. **Hardware Configuration Updated** ⚙️
   - Local environment parameters specified
   - GUI-specific parameters added based on screenshot analysis
   - All device paths and ports configured

3. **Physical Hardware Tested** 🔧
   - All devices connected and drivers installed
   - Vendor software working for each device
   - Communication verified for all hardware

4. **Development Environment Ready** 💻
   - Backend and frontend applications running
   - MUI theme and navigation working
   - All placeholder interfaces accessible

### Phase 1C Development Plan

Once prerequisites are met, Phase 1C will involve:

1. **Individual Device Panel Development**
   - Implement manufacturer-style interfaces for each device
   - Create device-specific control components
   - Integrate real hardware communication

2. **Backend Module Implementation**
   - Complete controller classes for all devices
   - Implement API endpoints for device operations
   - Add error handling and status monitoring

3. **Frontend Component Development**
   - Build device-specific UI components
   - Implement real-time data display
   - Add interactive controls and feedback

4. **Integration and Testing**
   - Connect frontend to backend APIs
   - Test with actual hardware
   - Validate manufacturer interface accuracy

---

## VERIFICATION CHECKLIST FOR PHASE 1C READINESS

### GUI Screenshots Verification
- [ ] MIRcat control software screenshots collected
- [ ] PicoScope software interface screenshots collected
- [ ] Quantum Composers software screenshots collected
- [ ] Zurich LabOne interface screenshots collected
- [ ] Continuum laser interface screenshots collected (if available)
- [ ] Arduino development environment screenshots collected
- [ ] All screenshots are high resolution and clear
- [ ] Screenshots are organized in proper directory structure

### Hardware Verification
- [ ] All hardware devices are physically connected
- [ ] All device drivers are installed and working
- [ ] Device Manager (Windows) or equivalent shows no errors
- [ ] Each device can be accessed by its vendor software
- [ ] Vendor software interfaces match collected screenshots

### Software Verification
- [ ] Backend server starts without errors (`python src/main.py`)
- [ ] Frontend application loads with MUI dark theme (`pnpm run dev`)
- [ ] Navigation between all device modules works
- [ ] Dashboard shows all device status cards
- [ ] All placeholder interfaces are accessible and properly themed

### Configuration Verification
- [ ] `hardware_configuration.toml` updated with local device parameters
- [ ] All SDK paths point to actual installed software
- [ ] All COM ports/device paths are correct for your system
- [ ] GUI-specific parameters added based on screenshot analysis

---

## TROUBLESHOOTING COMMON ISSUES

### Frontend Theme Issues
**Error**: Components not displaying with dark theme
**Solution**: 
1. Verify MUI ThemeProvider is wrapping the app
2. Check that CssBaseline is included
3. Ensure all components use MUI theme colors

### Navigation Issues
**Error**: Routing not working between device panels
**Solution**:
1. Check React Router configuration in App.tsx
2. Verify all route paths are correctly defined
3. Ensure navigation links use correct paths

### Screenshot Collection Issues
**Error**: Cannot access manufacturer software
**Solution**:
1. Verify hardware drivers are installed
2. Check device connections
3. Use demo/simulation mode if available
4. Contact vendor support for software access

### Backend Module Loading
**Error**: Device modules not loading properly
**Solution**:
1. Check module directory structure
2. Verify __init__.py files exist
3. Check import statements in main.py
4. Review error logs for specific module issues

---

## NEXT STEPS

Once all critical actions are completed:

1. **Collect GUI Screenshots** 📸
   - Install and run all manufacturer software
   - Capture comprehensive interface screenshots
   - Organize screenshots in proper directory structure

2. **Update Configuration** ⚙️
   - Specify local environment parameters
   - Add GUI-specific parameters based on screenshots
   - Test configuration with actual hardware

3. **Verify System Readiness** ✅
   - Complete verification checklist
   - Test all hardware and software components
   - Confirm Phase 1C prerequisites are met

4. **Begin Phase 1C Development** 🚀
   - Implement individual device control panels
   - Develop manufacturer-style interfaces
   - Integrate real hardware communication

## SUPPORT CONTACTS

**Hardware Vendors:**
- Continuum/Coherent: service@coherent.com
- Daylight Solutions: support@daylightsolutions.com
- Pico Technology: support@picotech.com
- Quantum Composers: support@quantumcomposers.com
- Zurich Instruments: support@zhinst.com

**Development Support:**
- Review ARCHITECTURE.md for technical details
- Check GitHub issues for known problems
- Consult hardware manuals for device-specific questions
- Review AGENT_INSTRUCTIONS.md for development guidelines

---

**Document Status**: Phase 1A&B Complete - Phase 1C Preparation Required  
**Last Updated**: August 2025  
**Next Phase**: Phase 1C - Individual Device Panel Development

### 1. Hardware Documentation and SDK Status

**Priority: COMPLETED** ✅  
**Status: ALL DOCUMENTATION PROVIDED**

All required hardware documentation and SDK materials have been provided and organized in the project:

#### 1.1 Continuum Nd:YAG Laser (Surelite) ✅
- **Provided**: Complete user manual with TTL control specifications
- **Location**: `docs/manuals/continuum_surelite/SureliteNdYAGLaserManual.pdf`
- **Contains**: TTL trigger specifications, safety procedures, operational guidelines

#### 1.2 Daylight MIRcat Laser ✅
- **Provided**: Complete SDK and documentation package
- **Location**: `docs/manuals/daylight_mircat/` and `docs/sdks/daylight_mircat/`
- **Contains**: 
  - User manual and SDK programming guide
  - Complete Python SDK with DLL libraries
  - Example implementation code
  - Technical datasheet

#### 1.3 PicoScope 5244D ✅
- **Provided**: Complete programming documentation
- **Location**: `docs/manuals/picoscope_5244d/` and `docs/sdks/picoscope/`
- **Contains**:
  - Hardware specifications and user guides
  - API programming guides
  - Advanced trigger documentation
  - Signal generator integration guides

#### 1.4 Quantum Composers 9524 ✅
- **Provided**: Complete programming and operation documentation
- **Location**: `docs/manuals/quantum_composers_9524/`
- **Contains**:
  - Hardware datasheet and operator manual
  - Programming guides and command references
  - System configuration documentation

#### 1.5 Zurich HF2LI Lock-in Amplifier ✅
- **Provided**: Complete user manual
- **Location**: `docs/manuals/zurich_hf2li/ziHF2_UserManual.pdf`
- **Additional**: GitHub repository references for LabOne API
- **Contains**: Complete programming interface documentation

#### 1.6 Arduino Uno R4 Minima ✅
- **Provided**: Official datasheet
- **Location**: `docs/manuals/arduino_uno_r4/ABX00080-datasheet.pdf`
- **Contains**: Hardware specifications and programming interface

#### 1.7 System Wiring Diagram ✅
- **Provided**: Complete system interconnection diagram
- **Location**: `docs/wiring_diagrams/WiringDiagram.jpg`
- **Contains**: All device connections and signal routing

#### 1.8 GitHub Repository References ✅
- **Provided**: Comprehensive reference list
- **Location**: `docs/references/GITHUB_REPOSITORIES.md`
- **Contains**: Essential repositories for PicoScope and Zurich Instruments development

### 2. Hardware Configuration Update

**Priority: PARTIALLY COMPLETE** ⚠️  
**Estimated Time: 30 minutes**

The `hardware_configuration.toml` file has been updated with detailed parameters from the hardware documentation. However, you still need to customize it for your specific environment:

#### 2.1 Device Connection Parameters ⚠️
The configuration file now contains detailed hardware specifications, but you need to update the following for your local setup:

**Arduino Uno R4 Minima:**
```toml
[arduino_uno_r4]
port = "COM3"  # UPDATE: Windows: "COM3", Linux: "/dev/ttyUSB0", macOS: "/dev/cu.usbmodem*"
```

**Daylight MIRcat:**
```toml
[daylight_mircat]
sdk_path = "C:/Program Files/Daylight Solutions/MIRcat SDK"  # UPDATE: Your actual SDK path
```

**PicoScope 5244D:**
```toml
[picoscope_5244d]
sdk_path = "C:/Program Files/Pico Technology/SDK"  # UPDATE: Your actual PicoSDK path
```

**Quantum Composers 9524:**
```toml
[quantum_composers_9524]
port = "COM4"  # UPDATE: Your actual COM port
```

**Zurich HF2LI:**
```toml
[zurich_hf2li]
device_id = "dev####"  # UPDATE: Your device serial number (found on device label)
labone_path = "C:/Program Files/Zurich Instruments/LabOne"  # UPDATE: Your LabOne path
```

#### 2.2 What's Already Configured ✅
The following have been configured based on the hardware documentation:
- Complete hardware specifications for all devices
- Communication parameters (baud rates, timeouts, etc.)
- Default operational parameters
- Safety limits and interlocks
- Channel assignments based on wiring diagram
- Experiment coordination parameters

#### 2.2 How to Find Connection Parameters

**Windows:**
1. Open Device Manager (devmgmt.msc)
2. Look under "Ports (COM & LPT)" for serial devices
3. Look under "Universal Serial Bus controllers" for USB devices
4. Note the COM port numbers (e.g., COM3, COM4)

**Linux:**
1. Run `lsusb` to list USB devices
2. Run `dmesg | grep tty` to see serial port assignments
3. Check `/dev/ttyUSB*` and `/dev/ttyACM*` for serial devices

**macOS:**
1. Run `ls /dev/cu.*` to list serial devices
2. Run `system_profiler SPUSBDataType` for USB device information

### 3. Physical Hardware Setup

**Priority: HIGH**  
**Estimated Time: 2-3 hours**

#### 3.1 Hardware Connections
Ensure all devices are properly connected:

- [ ] Arduino Uno R4 connected via USB to computer
- [ ] Daylight MIRcat connected via USB to computer
- [ ] PicoScope 5244D connected via USB 3.0 to computer
- [ ] Quantum Composers 9524 connected via USB to computer
- [ ] Zurich HF2LI connected via USB to computer
- [ ] Continuum Nd:YAG laser connected to Quantum Composers TTL output

#### 3.2 Driver Installation
Install device drivers for:

- [ ] Arduino Uno R4 (usually automatic)
- [ ] PicoScope 5244D (from PicoSDK)
- [ ] Quantum Composers 9524 (from vendor)
- [ ] Zurich HF2LI (from LabOne package)
- [ ] Daylight MIRcat (from vendor SDK)

#### 3.3 Device Testing
Test each device individually:

- [ ] Arduino: Upload simple blink sketch to verify communication
- [ ] PicoScope: Run PicoScope software to verify connection
- [ ] Quantum Composers: Use vendor software to test signal generation
- [ ] Zurich HF2LI: Run LabOne software to verify connection
- [ ] MIRcat: Use vendor software to test laser communication

### 4. Software Environment Setup

**Priority: HIGH**  
**Estimated Time: 1 hour**

#### 4.1 Python Environment
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 4.2 Node.js Environment
```bash
cd frontend
pnpm install
```

#### 4.3 Test Application
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python src/main.py

# Terminal 2 - Frontend
cd frontend
pnpm run dev
```

Navigate to `http://localhost:5173` and verify the application loads.

---

## OPTIONAL ACTIONS

### 5. Development Environment Optimization

**Priority: LOW**  
**Estimated Time: 30 minutes**

#### 5.1 IDE Configuration
- Install Python and JavaScript extensions for your IDE
- Configure code formatting (Black for Python, Prettier for JavaScript)
- Set up debugging configurations

#### 5.2 Git Configuration
```bash
cd IR_Spectroscope_Control_Interface
git add .
git commit -m "Phase 0: Initial project structure"
git push origin main
```

### 6. Documentation Review

**Priority: LOW**  
**Estimated Time: 1 hour**

Review the generated documentation:
- [ ] README.md - Project overview and setup instructions
- [ ] ARCHITECTURE.md - Technical architecture details
- [ ] docs/README.md - Documentation organization guide

---

## VERIFICATION CHECKLIST

Before proceeding to Phase 1, verify that:

### Hardware Verification
- [ ] All hardware devices are physically connected
- [ ] All device drivers are installed and working
- [ ] Device Manager (Windows) or equivalent shows no errors
- [ ] Each device can be accessed by its vendor software

### Software Verification
- [ ] Backend server starts without errors (`python src/main.py`)
- [ ] Frontend application loads without errors (`pnpm run dev`)
- [ ] Navigation between modules works in the web interface
- [ ] Arduino module shows connection controls (even if not connected)

### Configuration Verification
- [ ] `hardware_configuration.toml` has been updated with actual device parameters for your environment
- [ ] All SDK paths in configuration point to actual installed software
- [ ] All COM ports/device paths in configuration are correct for your system

### Documentation Verification ✅ COMPLETE
- [x] All required hardware manuals are available in `docs/manuals/`
- [x] All required SDKs are available in `docs/sdks/`
- [x] System wiring diagram is available in `docs/wiring_diagrams/`
- [x] GitHub repository references are documented in `docs/references/`
- [x] Hardware configuration contains detailed specifications

---

## TROUBLESHOOTING COMMON ISSUES

### Backend Won't Start
**Error**: `ModuleNotFoundError` or import errors
**Solution**: 
1. Ensure virtual environment is activated
2. Run `pip install -r requirements.txt`
3. Check Python version (3.11+ required)

### Frontend Won't Start
**Error**: `Module not found` or build errors
**Solution**:
1. Delete `node_modules`: `rm -rf node_modules`
2. Reinstall: `pnpm install`
3. Check Node.js version (18+ required)

### Device Not Found
**Error**: Device connection failures
**Solution**:
1. Check physical USB connections
2. Verify drivers are installed
3. Check Device Manager for errors
4. Update COM port in configuration file

### Permission Denied (Linux/macOS)
**Error**: Cannot access device files
**Solution**:
1. Add user to dialout group: `sudo usermod -a -G dialout $USER`
2. Log out and log back in
3. Or run with sudo (not recommended for production)

---

## NEXT STEPS

Once all critical actions are completed:

1. **Verify the checklist above**
2. **Test the Arduino module** with actual hardware
3. **Contact the development team** to proceed with Phase 1
4. **Begin implementation** of remaining hardware modules

## SUPPORT CONTACTS

**Hardware Vendors:**
- Continuum/Coherent: service@coherent.com
- Daylight Solutions: support@daylightsolutions.com
- Pico Technology: support@picotech.com
- Quantum Composers: support@quantumcomposers.com
- Zurich Instruments: support@zhinst.com

**Development Support:**
- Review ARCHITECTURE.md for technical details
- Check GitHub issues for known problems
- Consult hardware manuals for device-specific questions

---

**Document Status**: Phase 0 Complete - Ready for User Action  
**Last Updated**: August 2025  
**Next Phase**: Phase 1 - Hardware Module Development

