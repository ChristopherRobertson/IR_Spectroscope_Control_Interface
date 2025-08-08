# Troubleshooting Guide

This document serves as a centralized, living knowledge base of common problems, errors, and their solutions. This saves future developers significant time by providing immediate answers to issues that have been encountered and solved before.

## Common Setup Issues

### Backend Server Issues

#### Problem: "Backend server fails to start with ModuleNotFoundError"
**Solution**:
1. Ensure you have activated the Python virtual environment:
   ```bash
   source venv/bin/activate  # Linux/macOS
   # or
   venv\Scripts\activate     # Windows
   ```
2. Install all dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Verify Python version compatibility (Python 3.8+ required)

#### Problem: "FastAPI server starts but shows 'Module not found' for hardware modules"
**Solution**:
1. Check that all module directories have `__init__.py` files
2. Verify the module structure matches the architecture specification
3. Check for syntax errors in module files:
   ```bash
   python -m py_compile backend/modules/[module_name]/controller.py
   ```

#### Problem: "Port already in use" error when starting backend"
**Solution**:
1. Check if another instance is running:
   ```bash
   lsof -i :8000  # Linux/macOS
   netstat -ano | findstr :8000  # Windows
   ```
2. Kill the existing process or change the port in main.py
3. Use a different port: `uvicorn main:app --port 8001`

### Frontend Issues

#### Problem: "Frontend fails to start with dependency errors"
**Solution**:
1. Delete node_modules and package-lock.json:
   ```bash
   rm -rf node_modules package-lock.json
   ```
2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```
3. Reinstall dependencies:
   ```bash
   npm install
   ```

#### Problem: "TypeScript compilation errors"
**Solution**:
1. Check TypeScript version compatibility
2. Verify all imports use correct file extensions (.tsx, .ts)
3. Check tsconfig.json configuration
4. Run type checking: `npm run type-check`

#### Problem: "UI does not update after an action"
**Solution**:
1. Open the browser's developer console (F12) and check for JavaScript errors
2. Check the 'Network' tab to see if the API call to the backend was successful (Status 200 OK)
3. Verify the API endpoint URL is correct in the module's api.ts file
4. Check if the backend module is properly registered and responding

## Hardware-Specific Issues

### Arduino Uno R4 Minima

#### Problem: "Connection times out or device not found"
**Solution**:
1. Verify the COM port in hardware_configuration.toml matches the actual port:
   - Windows: Check Device Manager → Ports (COM & LPT)
   - Linux: Check `ls /dev/ttyUSB*` or `ls /dev/ttyACM*`
   - macOS: Check `ls /dev/cu.usbmodem*`
2. Ensure the Arduino IDE can connect to the device
3. Check USB cable and try a different USB port
4. Verify baud rate matches (115200 is standard)

#### Problem: "Permission denied accessing serial port (Linux)"
**Solution**:
1. Add user to dialout group:
   ```bash
   sudo usermod -a -G dialout $USER
   ```
2. Log out and log back in
3. Or run with sudo (not recommended for production)

### Daylight MIRcat Laser

#### Problem: "MIRcat SDK not found or import errors"
**Solution**:
1. Verify SDK path in hardware_configuration.toml points to actual installation
2. Check that MIRcatSDK.dll is in the correct location
3. Ensure Python can find the SDK:
   ```python
   import sys
   sys.path.append("path/to/mircat/sdk")
   ```
4. Verify Qt dependencies (QtCore4.dll, QtGui4.dll) are available

#### Problem: "Laser connection fails or times out"
**Solution**:
1. Check USB connection and cable
2. Verify laser is powered on and initialized
3. Ensure no other software is controlling the laser
4. Check interlock and key switch status
5. Verify communication settings match laser configuration

#### Problem: "Temperature not stabilized error"
**Solution**:
1. Allow sufficient warm-up time (typically 15-30 minutes)
2. Check ambient temperature is within specifications
3. Verify cooling system is functioning
4. Check for error codes in laser display

### PicoScope 5244D

#### Problem: "PicoScope not detected or driver issues"
**Solution**:
1. Install latest PicoScope software and drivers from Pico Technology website
2. Verify device appears in Device Manager (Windows) or lsusb (Linux)
3. Check USB 3.0 connection for optimal performance
4. Try different USB port or cable
5. Restart PicoScope software to refresh device list

#### Problem: "Data acquisition fails or returns empty arrays"
**Solution**:
1. Check trigger settings - ensure trigger level is appropriate
2. Verify input range matches signal amplitude
3. Check channel coupling (AC/DC) settings
4. Ensure sufficient memory depth for acquisition time
5. Verify timebase settings are appropriate for signal frequency

#### Problem: "Streaming mode drops samples"
**Solution**:
1. Reduce sample rate or number of active channels
2. Increase buffer size in configuration
3. Check USB bandwidth limitations
4. Use block mode for high-speed acquisitions
5. Ensure computer has sufficient processing power

### Quantum Composers 9524

#### Problem: "Signal generator not responding to commands"
**Solution**:
1. Verify COM port and baud rate (115200, 8N1)
2. Check command termination (should be \r\n)
3. Test with manufacturer's software first
4. Verify USB driver installation
5. Check for command syntax errors

#### Problem: "TTL outputs not working"
**Solution**:
1. Check output amplitude settings (should be 5V for TTL)
2. Verify channel is enabled and configured
3. Check load impedance (50Ω vs high impedance)
4. Measure output with oscilloscope
5. Check for proper grounding

#### Problem: "Timing synchronization issues"
**Solution**:
1. Verify master clock settings
2. Check delay settings between channels
3. Ensure all devices are using same reference
4. Check for jitter in trigger signals
5. Verify cable lengths and signal integrity

### Zurich HF2LI Lock-in Amplifier

#### Problem: "LabOne connection fails"
**Solution**:
1. Verify LabOne software is installed and running
2. Check device serial number in configuration
3. Ensure device is powered on and connected via USB
4. Restart LabOne Data Server
5. Check firewall settings (port 8004)

#### Problem: "Lock-in measurements show excessive noise"
**Solution**:
1. Check input grounding and shielding
2. Adjust time constant for signal bandwidth
3. Verify reference frequency matches signal
4. Check for ground loops
5. Ensure proper input range selection

#### Problem: "API commands timeout or fail"
**Solution**:
1. Increase timeout values in configuration
2. Check LabOne API level compatibility
3. Verify command syntax and parameters
4. Check for device busy state
5. Restart LabOne software if necessary

## Configuration Issues

### Problem: "Hardware configuration file not found or invalid"
**Solution**:
1. Verify hardware_configuration.toml exists in project root
2. Check TOML syntax using online validator
3. Ensure all required sections are present
4. Verify file permissions allow reading
5. Check for special characters or encoding issues

### Problem: "Device parameters out of range"
**Solution**:
1. Check hardware documentation for valid parameter ranges
2. Verify units are correct (e.g., Hz vs kHz)
3. Update configuration with manufacturer specifications
4. Check for firmware version compatibility
5. Validate parameters before sending to device

## Network and Communication Issues

### Problem: "API calls fail with CORS errors"
**Solution**:
1. Verify FastAPI CORS middleware is configured
2. Check frontend API base URL configuration
3. Ensure backend is running on expected port
4. Check browser developer tools for specific CORS errors
5. Verify request headers and methods

### Problem: "Intermittent communication failures"
**Solution**:
1. Check USB cable quality and connections
2. Verify power supply stability
3. Check for electromagnetic interference
4. Implement retry logic in communication code
5. Add proper error handling and logging

## Development Issues

### Problem: "Module imports fail in development"
**Solution**:
1. Check Python path and virtual environment
2. Verify module structure matches architecture
3. Check for circular imports
4. Ensure all __init__.py files are present
5. Use absolute imports where possible

### Problem: "Hot reload not working in frontend"
**Solution**:
1. Check if files are being watched correctly
2. Verify file extensions are included in watch list
3. Check for syntax errors preventing compilation
4. Restart development server
5. Clear browser cache

## Performance Issues

### Problem: "Slow response times from hardware"
**Solution**:
1. Check communication timeouts and retry settings
2. Optimize command batching where possible
3. Use asynchronous operations for non-blocking calls
4. Check for unnecessary polling or status checks
5. Profile code to identify bottlenecks

### Problem: "High CPU usage during data acquisition"
**Solution**:
1. Optimize data processing algorithms
2. Use appropriate data types and structures
3. Implement data streaming instead of large transfers
4. Check for memory leaks
5. Use hardware-specific optimizations

## Logging and Debugging

### Enable Debug Logging
1. Set log level to DEBUG in configuration
2. Check log files for detailed error messages
3. Use hardware-specific diagnostic tools
4. Enable verbose output in SDK calls
5. Monitor system resources during operation

### Common Log Messages
- **"Device not found"**: Check connections and drivers
- **"Timeout waiting for response"**: Increase timeout or check communication
- **"Parameter out of range"**: Verify configuration values
- **"Permission denied"**: Check user permissions and groups
- **"Resource busy"**: Another process may be using the device

---

## Getting Help

If you encounter an issue not covered in this guide:

1. **Check the logs**: Enable debug logging and examine the output
2. **Consult hardware manuals**: Located in `docs/manuals/`
3. **Review API documentation**: Check vendor-specific API guides
4. **Test with vendor software**: Verify hardware works with manufacturer tools
5. **Check GitHub issues**: Look for similar problems in referenced repositories
6. **Update this document**: Add new solutions when problems are resolved

---

**Last Updated**: August 2025  
**Maintained By**: IR Spectroscopy Control Interface Development Team  
**Review Schedule**: Update when new issues are encountered and resolved

