# Documentation Directory

This directory contains all hardware documentation, SDKs, and reference materials for the IR Pump-Probe Spectroscopy System.

## Directory Structure

### `/manuals/`
Place all hardware manuals and user guides here:
- Arduino Uno R4 Minima documentation
- Continuum Surelite Nd:YAG laser manual
- Daylight MIRcat laser documentation
- PicoScope 5244D user manual
- Quantum Composers 9524 manual
- Zurich HF2LI lock-in amplifier documentation

### `/sdks/`
Place all software development kits and drivers here:
- PicoSDK (for PicoScope control)
- Daylight MIRcat SDK
- Zurich LabOne software and APIs
- Arduino IDE and libraries
- Quantum Composers programming libraries

### `/examples/`
Place example code and configuration files here:
- Device control examples
- Communication protocol examples
- Configuration file templates
- Test scripts

### `/specifications/`
Place technical specifications and datasheets here:
- Device specifications
- Communication protocol specifications
- Electrical interface specifications
- Performance characteristics

## Required Documentation (ACTION REQUIRED)

The following documentation needs to be obtained and placed in the appropriate directories:

### Critical Missing Documentation:
1. **Continuum Surelite Nd:YAG Laser Manual** - Required for TTL control specifications
2. **Daylight MIRcat SDK and Documentation** - Required for laser control implementation
3. **PicoScope 5244D Programming Manual** - Required for oscilloscope integration
4. **Quantum Composers 9524 Programming Guide** - Required for signal generator control
5. **Zurich HF2LI LabOne Programming Manual** - Required for lock-in amplifier integration
6. **Arduino Uno R4 Minima Programming Reference** - Required for MUX controller implementation

### Where to Find Documentation:
- **PicoScope**: Download PicoSDK from https://www.picotech.com/downloads
- **Zurich Instruments**: Download LabOne from https://www.zhinst.com/downloads
- **Daylight Solutions**: Contact vendor for MIRcat SDK
- **Quantum Composers**: Download from vendor website or contact support
- **Continuum**: Contact vendor for Surelite documentation
- **Arduino**: Available at https://docs.arduino.cc/

### Installation Requirements:
After obtaining the documentation and SDKs, update the paths in `hardware_configuration.toml`:
- `picoscope_5244d.sdk_path`
- `daylight_mircat.sdk_path`
- `zurich_hf2li.labone_path`

## Next Steps
1. Obtain all required documentation and SDKs
2. Update hardware_configuration.toml with correct paths and device-specific parameters
3. Test hardware connections and verify communication protocols
4. Proceed with Phase 1 GUI development

