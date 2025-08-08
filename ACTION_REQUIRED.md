# ACTION REQUIRED - Phase 0 Completion Tasks

## Overview

Phase 0 (Project Structure) has been successfully completed. This document outlines the critical actions required from the user before proceeding with Phase 1 (Hardware Module Development). All items marked as **CRITICAL** must be completed before development can continue.

## Current Status

✅ **COMPLETED**
- Project structure and modular architecture implemented
- Backend Flask application with dynamic module loading
- Frontend React application with routing and navigation
- Arduino Uno R4 example module (backend and frontend)
- Hardware configuration template created
- Comprehensive documentation generated
- **ALL HARDWARE DOCUMENTATION PROVIDED** ✅
- **COMPLETE SDK AND REFERENCE MATERIALS AVAILABLE** ✅

🚧 **PENDING USER ACTION**
- Hardware configuration parameter specification for local environment
- Physical hardware setup and testing
- SDK installation and driver setup

---

## CRITICAL ACTIONS REQUIRED

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

