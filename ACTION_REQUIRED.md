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

🚧 **PENDING USER ACTION**
- Hardware documentation and SDK acquisition
- Hardware configuration parameter specification
- Physical hardware setup and testing

---

## CRITICAL ACTIONS REQUIRED

### 1. Hardware Documentation and SDK Acquisition

**Priority: CRITICAL**  
**Estimated Time: 2-4 hours**

You must obtain and install the following hardware documentation and software development kits:

#### 1.1 Continuum Nd:YAG Laser (Surelite)
- **Required**: User manual with TTL control specifications
- **Where to find**: Contact Continuum (now Coherent) support
- **Phone**: +1-408-764-4983
- **Email**: service@coherent.com
- **What to request**: 
  - Surelite series user manual
  - TTL trigger specifications
  - Command protocol documentation
- **Install location**: `docs/manuals/continuum_surelite/`

#### 1.2 Daylight MIRcat Laser
- **Required**: MIRcat SDK and programming documentation
- **Where to find**: Daylight Solutions customer portal
- **Website**: https://www.daylightsolutions.com/support/
- **Login required**: Contact your sales representative for access
- **What to download**:
  - MIRcat SDK (Windows/Linux)
  - Programming manual
  - API reference documentation
- **Install location**: `docs/sdks/daylight_mircat/`

#### 1.3 PicoScope 5244D
- **Required**: PicoSDK and programming guides
- **Where to find**: Pico Technology downloads page
- **Website**: https://www.picotech.com/downloads
- **What to download**:
  - PicoSDK (latest version)
  - PicoScope 5000 Series Programmer's Guide
  - Python examples
- **Install location**: `docs/sdks/picoscope/`

#### 1.4 Quantum Composers 9524
- **Required**: Programming manual and software
- **Where to find**: Quantum Composers support
- **Website**: https://www.quantumcomposers.com/support
- **Email**: support@quantumcomposers.com
- **What to request**:
  - 9524 series programming manual
  - USB driver software
  - Command reference guide
- **Install location**: `docs/manuals/quantum_composers/`

#### 1.5 Zurich HF2LI Lock-in Amplifier
- **Required**: LabOne software and programming documentation
- **Where to find**: Zurich Instruments downloads
- **Website**: https://www.zhinst.com/downloads
- **What to download**:
  - LabOne software package
  - LabOne Programming Manual
  - Python API examples
- **Install location**: `docs/sdks/zurich_instruments/`

#### 1.6 Arduino Uno R4 Minima
- **Required**: Arduino IDE and documentation
- **Where to find**: Arduino official website
- **Website**: https://www.arduino.cc/en/software
- **What to download**:
  - Arduino IDE (latest version)
  - Arduino Uno R4 documentation
- **Install location**: `docs/sdks/arduino/`

### 2. Hardware Configuration Update

**Priority: CRITICAL**  
**Estimated Time: 1-2 hours**

Update the `hardware_configuration.toml` file with your specific hardware parameters:

#### 2.1 Device Connection Parameters
For each device, you need to determine and update:

**Arduino Uno R4 Minima:**
```toml
[arduino_uno_r4]
port = "YOUR_ACTUAL_PORT"  # e.g., "COM3" (Windows), "/dev/ttyUSB0" (Linux), "/dev/cu.usbmodem*" (macOS)
```

**Daylight MIRcat:**
```toml
[daylight_mircat]
port = "YOUR_USB_DEVICE_PATH"
sdk_path = "FULL_PATH_TO_MIRCAT_SDK"
```

**PicoScope 5244D:**
```toml
[picoscope_5244d]
sdk_path = "FULL_PATH_TO_PICOSDK"
```

**Quantum Composers 9524:**
```toml
[quantum_composers_9524]
port = "YOUR_ACTUAL_PORT"  # Check Device Manager (Windows) or dmesg (Linux)
```

**Zurich HF2LI:**
```toml
[zurich_hf2li]
device_id = "YOUR_DEVICE_SERIAL_NUMBER"  # Found on device label
labone_path = "FULL_PATH_TO_LABONE_INSTALLATION"
```

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
- [ ] `hardware_configuration.toml` has been updated with actual device parameters
- [ ] All SDK paths in configuration point to actual installed software
- [ ] All COM ports/device paths in configuration are correct

### Documentation Verification
- [ ] All required hardware manuals are downloaded and placed in `docs/manuals/`
- [ ] All required SDKs are downloaded and placed in `docs/sdks/`
- [ ] SDK installation paths are documented in configuration file

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

