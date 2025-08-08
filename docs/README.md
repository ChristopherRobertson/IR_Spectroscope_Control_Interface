# Documentation Directory

This directory contains all hardware documentation, software development kits, reference materials, and examples for the IR Pump-Probe Spectroscopy Control Interface project.

## Directory Structure

```
docs/
├── README.md                           # This file
├── manuals/                           # Hardware manuals and user guides
│   ├── arduino_uno_r4/               # Arduino Uno R4 Minima documentation
│   │   └── ABX00080-datasheet.pdf    # Official Arduino datasheet
│   ├── continuum_surelite/           # Continuum Nd:YAG laser documentation
│   │   └── SureliteNdYAGLaserManual.pdf # Complete user manual
│   ├── daylight_mircat/              # Daylight MIRcat laser documentation
│   │   ├── DaylightSolutionsMIRcatManual.pdf # User manual
│   │   ├── MIRcatSDKGuide.pdf        # SDK programming guide
│   │   └── DRS_DLS_MIRCAT-DATA-SHEET_REV-12.pdf # Technical datasheet
│   ├── picoscope_5244d/              # PicoScope 5244D documentation
│   │   ├── PicoScope_7_User_s_Guide_psw7.en.pdf # PicoScope 7 software guide
│   │   ├── picoscope-5000d-series-data-sheet.pdf # Hardware specifications
│   │   └── picoscope-5000d-series-users-guide.pdf # User guide
│   ├── quantum_composers_9524/       # Quantum Composers signal generator docs
│   │   ├── 9520Datasheet.pdf         # Hardware datasheet
│   │   ├── DelayGeneratorMultiplexing-QuantumComposers.pdf
│   │   ├── DelayGeneratorSystemandChannelModes-QuantumComposers.pdf
│   │   ├── ProgrammingthePulseGeneratorwiththeCommTerminal-QuantumComposers.pdf
│   │   └── QuantumComposers9520SignalGeneratorOperatorsManual.pdf
│   └── zurich_hf2li/                 # Zurich Instruments lock-in amplifier docs
│       └── ziHF2_UserManual.pdf      # Complete user manual
│
├── sdks/                             # Software development kits and APIs
│   ├── arduino/                      # Arduino development resources
│   ├── daylight_mircat/              # MIRcat SDK files
│   │   ├── Main.py                   # Example Python implementation
│   │   ├── MIRcatSDKConstants.py     # SDK constants
│   │   ├── MIRcatSDKHelpers.py       # Helper functions
│   │   ├── MIRcatSDK.dll             # Windows SDK library
│   │   ├── QtCore4.dll               # Qt dependency
│   │   └── QtGui4.dll                # Qt GUI dependency
│   ├── picoscope/                    # PicoScope SDK and programming guides
│   │   ├── picoscope-5000-series-a-api-programmers-guide.pdf
│   │   ├── picosdk-advanced-triggers.pdf
│   │   └── TriggeringAPicoScopeSignalGeneratorUsingThePicoScopeAPIFunctions.pdf
│   └── zurich_instruments/           # Zurich Instruments SDK resources
│
├── references/                       # Reference materials and external resources
│   └── GITHUB_REPOSITORIES.md       # Essential GitHub repositories for development
│
├── wiring_diagrams/                  # System wiring and connection diagrams
│   └── WiringDiagram.jpg            # Complete system wiring diagram
│
├── examples/                         # Example code and configurations
└── specifications/                   # Technical specifications and requirements
```

## Hardware Documentation Status

### ✅ Complete Documentation
- **Arduino Uno R4 Minima**: Official datasheet available
- **Continuum Nd:YAG Laser**: Complete user manual with TTL specifications
- **Daylight MIRcat Laser**: User manual, SDK guide, and datasheet
- **PicoScope 5244D**: Complete documentation set with API guides
- **Quantum Composers 9524**: Full documentation including programming guides
- **Zurich HF2LI**: Complete user manual

### 📋 Available SDKs
- **MIRcat**: Complete Python SDK with DLL libraries
- **PicoScope**: API programming guides and trigger documentation
- **Zurich Instruments**: Reference to official GitHub repositories

## Key Reference Materials

### System Wiring
- **WiringDiagram.jpg**: Complete system interconnection diagram showing:
  - USB connections from all devices to computer
  - TTL signal routing from Signal Generator to Nd:YAG laser
  - Lock-in amplifier and oscilloscope input connections
  - Arduino switch connections for sample positioning

### GitHub Repositories
Essential repositories for development (see `references/GITHUB_REPOSITORIES.md`):
- **PicoScope**: `picotech/picosdk-python-wrappers`
- **Zurich Instruments**: Multiple repositories including `zhinst-toolkit`, `labone-api-examples`

## Development Guidelines

### Using This Documentation

1. **Hardware Setup**: Consult device manuals in `manuals/` for physical setup
2. **Programming**: Use SDK documentation in `sdks/` for software integration
3. **Wiring**: Reference `wiring_diagrams/` for system connections
4. **Examples**: Check GitHub repositories listed in `references/` for code examples

### Documentation Standards

- **Manuals**: Original vendor documentation in PDF format
- **SDKs**: Programming guides, API references, and example code
- **References**: Links to external resources and repositories
- **Examples**: Working code examples and configuration templates

### Missing Information

All critical hardware documentation has been provided. The following items are ready for Phase 1 development:

- ✅ Hardware connection specifications
- ✅ Programming interfaces and APIs
- ✅ System wiring diagrams
- ✅ SDK libraries and examples
- ✅ Reference implementations

## Next Steps

1. **Review Documentation**: Study the relevant manuals for each device
2. **Examine SDKs**: Understand the programming interfaces available
3. **Study Wiring**: Understand the system interconnections
4. **Reference Examples**: Use GitHub repositories for implementation patterns
5. **Begin Development**: Start Phase 1 hardware module implementation

---

**Documentation Status**: ✅ Complete  
**Last Updated**: August 2025  
**Ready for**: Phase 1 Development

