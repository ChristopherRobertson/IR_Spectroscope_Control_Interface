# AI Agent Development Instructions

## Project Overview

**Project Title**: Unified Control Interface for IR Pump-Probe Spectroscopy System

**Core Objective**: Develop a robust, user-friendly application to control and synchronize all electronic components of a Pump-Probe IR Spectroscopy system. The application will feature a Python backend for hardware control and a modern React frontend to create an intuitive graphical user interface (GUI) with panels for each instrument, and a sophisticated "Experiment" mode for orchestrating automated data acquisition runs using an "acquire-then-display" workflow.

## Core Technologies

- **Backend**: Python (using FastAPI for the API, and specific hardware control libraries like pyserial, pyvisa, etc.)
- **Frontend**: React (using TypeScript)
- **Version Control**: Git, hosted on the specified GitHub repository

## Hardware Components

1. **Arduino Uno R4 Minima**: MUX controller for sample positioning
2. **Continuum Nd:YAG Laser (Surelite)**: Pump source
3. **Daylight MIRcat Laser**: Probe source
4. **PicoScope 5244D**: Oscilloscope for alignment, calibration, and data collection
5. **Quantum Composers 9524**: Signal Generator for system synchronization
6. **Zurich HF2LI**: Lock-in Amplifier for data collection

**Note**: All devices are connected to the host computer via USB with the exception of the Nd:YAG laser, which is not connected to the computer at all and is directly controlled through the TTL signals sent from the Signal Generator.

## Agent Instruction Guide & Development Phases

### Phase 0: Project Structure

#### STEP 1: Document Analysis

**Goal**: Establish a solid foundation for the project by analyzing existing documentation and setting up the development environment and project structure.

**Method**: You are to perform a comprehensive analysis of the provided documentation. From there you need to create a professional project skeleton, and generate a targeted "To-Do List" for the user in the form of an ACTION_REQUIRED.md file. This list will outline the final pieces of information required to begin building the manual control GUI in the next phase.

**Agent Instructions**:
1. **Access Repository**: Clone the GitHub repository using the URL and Access Token stored in the Knowledge Base
2. **Analyze Documentation**: Perform a thorough review of all files within the /docs directory and all its subdirectories. For each document (PDF, text file, code example, etc.), you must determine its purpose and extract key information relevant to controlling the associated hardware device, including but not limited to:
   - Communication protocols (e.g., SCPI commands, proprietary APIs)
   - Connection parameters (e.g., default baud rates, required libraries)
   - Required drivers or SDKs
   - Control capabilities (e.g., what functions can be called)
   - Key control parameters (e.g., laser wavelength, pulse energy, oscilloscope timebase, etc.) and their acceptable ranges
3. **Reorganize Documentation**: You have permission to re-organize the /docs directory as you see fit for clarity and logical structure. For example, you may consolidate all manuals into one subdirectory and all SDKs into another, renaming files for consistency if necessary
4. **Create Configuration**: Create a hardware_config.toml file with the information obtained and then create an ACTION_REQUIRED.md file that requests the user to provide missing information required for system integration and how to find that information

#### STEP 2: Project Setup

**Goal**: To establish a project skeleton based on the analysis from part 1 of Phase 0.

**Method**: The entire application must be architected as a unified system composed of highly independent, self-contained modules for each hardware device. Each module should be treated as a "mini-app" with its own dedicated resources, logic, and UI components, while still being integrated into a single backend server and a single frontend application.

**Agent Instructions**:

##### Backend Structure (/backend):

The backend will have a single entrypoint (main.py), but the logic will be strictly modularized.

- **Top-Level Module Directory**: Create a primary directory for all hardware modules, for example, `/backend/modules/`
- **Self-Contained Device Modules**: Inside `/backend/modules/`, each of the 6 hardware devices will have its own dedicated directory (e.g., `/mircat`, `/picoscope`). Each of these directories is a self-contained Python package and must include:
  - `__init__.py`: To mark it as a Python package
  - `controller.py`: The main file containing the high-level control logic for the device (e.g., arm_laser, set_wavelength)
  - `routes.py`: A file that defines the API endpoints (e.g., `/api/mircat/...`) specific to this device. This keeps URL definitions out of the main server file
  - `/sdk/`: A subdirectory for any required vendor-provided SDKs, DLLs, or library files. This prevents conflicts between device dependencies
  - `/utils/`: A subdirectory for any helper functions, data parsers, or utility scripts specific to that device

- **Single Entrypoint (main.py)**: The root main.py file will be lean. Its primary responsibilities are:
  - To create the main FastAPI app instance
  - To iterate through the `/backend/modules/` subdirectories and dynamically import and register the routes.py from each one
  - To start the single web server
  - This ensures that to add a new device, you simply create a new module directory, and the main server will automatically discover and include its API endpoints

**Example Backend Directory Tree**:
```
/backend
├── main.py                 # Single entrypoint to run the server
├── requirements.txt
├── venv/
└── modules/
    ├── mircat/
    │   ├── __init__.py
    │   ├── controller.py     # MIRcat control logic
    │   ├── routes.py         # Defines /api/mircat/... endpoints
    │   ├── sdk/              # MIRcat-specific SDK files
    │   └── utils.py          # Helper functions for MIRcat
    │
    └── picoscope/
        ├── __init__.py
        ├── controller.py     # PicoScope control logic
        ├── routes.py         # Defines /api/picoscope/... endpoints
        ├── sdk/              # PicoScope-specific SDK files
        └── utils.py          # Helper functions for PicoScope
```

##### Frontend (/frontend):

The frontend will be a single React application but will mirror the modular backend structure. It will have a single entrypoint (index.js or main.jsx) and use a router to display the appropriate UI module.

- **Top-Level View/Module Directory**: Create a primary directory like `/frontend/src/modules/` or `/frontend/src/features/` to house the "mini-apps". This separates them cleanly from truly global components (like a navigation bar or layout)
- **Self-Contained UI Modules**: Inside `/frontend/src/modules/`, each hardware device will have its own directory (e.g., `/MIRcat`, `/PicoScope`). This directory will contain everything needed for that device's UI:
  - `index.tsx` (or `MIRcatView.tsx`): The main parent component that assembles the UI for that device. This is the component the main router will point to
  - `/components/`: A subdirectory for any smaller, reusable components used only within that device's UI (e.g., a special button, a status indicator, a parameter slider)
  - `api.ts`: A dedicated file containing all the fetch or axios calls that interact with that specific device's backend endpoints (e.g., `fetch('/api/mircat/arm')`)
  - `styles.css` (or `MIRcat.module.css`): CSS styles that are scoped to and only used by this module's components

- **Central Integration**:
  - `/components/global/`: A separate directory for truly shared components used across the entire application, such as a Navbar, Footer, or MainLayout
  - `App.tsx` & `Router.tsx`: The root App.tsx will set up the main layout and the router. The Router.tsx file will define the application's routes, mapping URLs like `/mircat` to the MIRcatView component from the corresponding module

**Example Frontend Directory Tree**:
```
/frontend
├── node_modules/
├── public/
├── package.json
└── src/
    ├── App.tsx                 # Main application shell (layout, router)
    ├── main.tsx                # Single entrypoint for the React app
    ├── index.css               # Global styles
    │
    ├── components/             # Truly global, shared components
    │   ├── Navbar.tsx
    │   └── Statusbar.tsx
    │
    └── modules/                # Directory for each "mini-app"
        ├── MIRcat/
        │   ├── MIRcatView.tsx  # Main view for this module
        │   ├── api.ts          # All API calls to /api/mircat/...
        │   ├── MIRcat.module.css # Scoped styles
        │   └── components/     # Components ONLY for MIRcat UI
        │       ├── WavelengthSlider.tsx
        │       └── ArmButton.tsx
        │
        ├── PicoScope/
        │   ├── PicoScopeView.tsx
        │   ├── api.ts
        │   ├── PicoScope.module.css
        │   └── components/
        │       ├── TimebaseSelector.tsx
        │       └── TriggerControls.tsx
        │
        └── Experiment/         # For Phase 2
            ├── ExperimentView.tsx
            ├── api.ts
            └── components/
                └── SequenceBuilder.tsx
```

##### Overall Project Root Structure:

The entire project will be contained within a single Git repository. The root directory will house the backend and frontend applications in their respective folders, alongside top-level files that manage the repository and provide overall project documentation.

**The final, complete directory structure should be organized as follows**:
```
/IR_Spectroscope_Control_Interface  (Project Root)
│
├── .gitignore                      # Specifies files/directories for Git to ignore
├── hardware_configuration.toml
├── README.md                       # Top-level project overview for human developers
├── AGENT_INSTRUCTIONS.md           # The project plan for the AI agent (this document)
├── ACTION_REQUIRED.md              # Document from part 1 of Phase 0
├── ARCHITECTURE.md
├── TROUBLESHOOTING.md
├── WISHLIST.md
│
├── backend/                        # All backend code (Python, FastAPI)
│   ├── main.py
│   ├── requirements.txt
│   └── modules/
│       └── ... (as defined previously)
│
└── frontend/                       # All frontend code (React, TypeScript)
    ├── package.json
    ├── src/
    │   └── ... (as defined previously)
    └── ...
```

#### STEP 3: Global Instructions

- If a parameter value or range is not directly stated in the documentation provided do NOT guess or make assumptions as to what it is. Update the ACTION_REQUIRED.md file with the missing information and instructions on how to find it if possible
- The backend will be created with FastAPI, the frontend with TypeScript
- Commit and push all the created and reorganized files to the main branch of the repository. This concludes Phase 0

## Contents and Purpose of Root-Level Files

### 1. AGENT_INSTRUCTIONS.md
**Purpose**: This is the master document containing the detailed, phase-by-phase instructions, architectural principles, and directory structures. It is the single source of truth for the AI agent.

**Content**: This file should contain the entire "Master Project Plan" we've outlined.

**Usage**: At the start of any development session, you can prompt with: "Review AGENT_INSTRUCTIONS.md and continue with [specific task]".

### 2. README.md
**Purpose**: This is the standard, human-readable entry point to the project. It provides a high-level overview, setup instructions, and general information for anyone browsing the GitHub repository. It should be more concise than the agent instructions.

**Suggested Content**:
- Project Title: Unified Control Interface for IR Pump-Probe Spectroscopy
- Description: A brief one-paragraph summary of the project's goal
- Features: A bulleted list of key features (e.g., individual device control, synchronized experiment automation, live data plotting)
- Technology Stack: List the main technologies (Python, FastAPI, React, TypeScript, etc.)
- Setup and Installation:
  - Instructions on how to clone the repository
  - Steps to set up and run the backend (pip install -r requirements.txt, python backend/main.py)
  - Steps to set up and run the frontend (cd frontend, npm install, npm start)
- Project Structure: A brief explanation of the modular "mini-app" architecture

### 3. .gitignore
**Purpose**: This is a critical file that tells Git which files and directories to intentionally ignore and not track in version control. This keeps the repository clean and prevents sensitive information or unnecessary files from being committed.

**Essential Content**: A comprehensive .gitignore file should be created at the project root to cover both the Python backend and the Node.js frontend.

### 4. ACTION_REQUIRED.md
**Purpose**: This file serves as a high-level, human-readable "to-do" list, bug tracker, and task list. It provides immediate visibility into the project's current status, pending tasks, and known issues.

**Suggested Content**: Use Markdown checklists to organize tasks. The file should be structured with clear headings.
- Instructions for tasks the user must complete such as how to find the required missing information in hardware_configuration.toml that were not able to be found in Part 1 of Phase 0
- Next Immediate Steps: A short, prioritized list of the next steps the user must take before the Agent can move on to the next step of the current phase
- Phase 1 - GUI Replication: A checklist for each of the 6 devices, marking which are complete, in-progress, or not started
- Phase 2 - Synchronization: A checklist for the major goals of the synchronization phase

**Usage**: This document should be updated regularly by both the Agent and the user to keep track of what needs to be done.

### 5. hardware_configuration.toml
**Purpose**: To externalize all hardware-specific connection parameters and settings from the source code. Hardcoding things like COM ports or IP addresses makes the software brittle and hard to configure for different setups.

**Why TOML?**: TOML (.toml) is chosen for its clear, human-readable syntax, making it ideal for configuration files. It's also easily parsed by libraries in many languages, including Python (tomli).

**Content**: The file should be organized into sections, with one section for each piece of hardware. It will store details needed to establish a connection, parameter ranges, etc.

**Usage**: The Python backend, specifically the controller for each device, will read this file upon startup to get the necessary connection parameters.

### 6. ARCHITECTURE.md
**Purpose**: This document serves as the definitive technical blueprint of the application. While README.md provides a brief overview, this file offers a deep dive into the architectural decisions, explaining how and, more importantly, why the system is built the way it is.

**Content**:
- Core Philosophy: A clear statement of the architectural goal (e.g., "A modular monolith designed for maintainability and extensibility")
- Directory Structure Deep Dive: The full, annotated directory trees for the project root, backend, and frontend
- Backend Architecture: Detailed explanation of the "mini-app" structure within the /backend/modules/ directory
- Frontend Architecture: Detailed explanation of the parallel "mini-app" structure in the /frontend/src/modules/ directory
- Data Flow Diagram/Explanation: A step-by-step description of a typical user interaction
- Guide: How to Add a New Hardware Module: A prescriptive, step-by-step tutorial for future developers

### 7. TROUBLESHOOTING.md
**Purpose**: To create a centralized, living knowledge base of common problems, errors, and their solutions. This saves future developers significant time by providing immediate answers to issues that have been encountered and solved before.

**Content**: The file should be structured by topic or by hardware device for easy navigation. Each entry should clearly state the problem and provide a step-by-step solution.

### 8. WISHLIST.md
**Purpose**: To provide a dedicated space for capturing future feature ideas, potential improvements, and long-term goals that are not currently scheduled for development.

**Content**: The file can be a simple, categorized list of ideas for major features, UI/UX enhancements, and performance improvements.

## Documentation Strategy

### Four-Layered Documentation Strategy:

#### Layer 1: The "10,000-Foot View" - README.md
This is the first file a new developer will see. Its purpose is to quickly answer: "What is this project, and how do I get it running?"

- **Project Purpose**: A clear, concise summary of what the application does (e.g., "A unified control interface for an IR Pump-Probe Spectroscopy system...")
- **Technology Stack**: A quick list of the major technologies used (Python/FastAPI, React, etc.)
- **Getting Started Guide**:
  - Prerequisites: What needs to be installed on their machine (Python 3.x, Node.js, Git)
  - Installation: Simple, copy-pasteable commands to set up the backend and frontend (git clone, pip install, npm install)
  - Running the Application: The exact commands to start the backend and frontend servers
- **High-Level Architecture Overview**: A brief explanation of the "collection of mini-apps" or "modular monolith" structure, directing them to the dedicated architecture document for details

#### Layer 2: The "Architect's Blueprint" - ARCHITECTURE.md
This document explains the "why" behind the project's structure. It's for the developer who needs to understand how the pieces fit together before they start adding a new one.

- **Core Principles**: Document the key architectural decisions, especially the "mini-app" structure for both backend and frontend. Explain why this approach was chosen (maintainability, separation of concerns)
- **Directory Structure Deep Dive**: Include the full directory trees for the root, backend, and frontend. Briefly explain the purpose of each major directory (/modules, /components, etc.)
- **Data Flow**: A simple explanation or diagram showing how a user action flows through the system:
  - User clicks a button in a React component
  - The component's api.ts sends a request to the backend
  - The main FastAPI server routes the request to the correct device module
  - The device controller.py communicates with the hardware
  - A response is sent back to the frontend, updating the UI
- **How to Add a New Device**: A step-by-step guide for a future developer, e.g.:
  - "Create a new directory under /backend/modules/"
  - "Create controller.py, routes.py, etc., inside it"
  - "The main server in main.py will auto-discover your routes"
  - "Create a corresponding UI module under /frontend/src/modules/"
  - "Add a new route in the main React router to display your new UI module"

#### Layer 3: The "On-the-Ground Guide" - Module-Level README.md Files
Each "mini-app" or module should have its own README.md file. This is for the developer who is tasked with fixing a bug or adding a feature to a specific device.

- **Location**: Place a README.md inside each module's directory (e.g., /backend/modules/mircat/README.md and /frontend/src/modules/MIRcat/README.md)
- **Backend Module README**:
  - Device: Name of the hardware (e.g., Daylight MIRcat Laser)
  - Communication: Protocol used (e.g., Serial, TCP/IP) and key parameters
  - Key Commands: A list of the most important commands implemented in the controller.py
  - Dependencies: Note any special SDKs, DLLs, or Python libraries required only for this module
  - Quirks/Notes: Any strange behavior or important notes about the device (e.g., "Device requires a 500ms delay between commands")
- **Frontend Module README**:
  - Purpose: What this part of the UI does
  - Key Components: A description of the main components inside the module and what they are for
  - State Management: How UI state is handled for this module
  - API Endpoints: List the backend API endpoints this UI module consumes

#### Layer 4: The "Street-Level View" - Code Comments & Docstrings
This is the most granular level of documentation, intended for someone reading the actual code.

- **Python Docstrings**: Every Python function, especially in the controller files, should have a clear docstring explaining:
  - What the function does
  - Its arguments (:param:)
  - What it returns (:return:)
  - Any exceptions it might raise (:raises:)
- **JSDoc for TypeScript/React**: Use JSDoc comments for critical functions, especially in the api.ts files, to explain parameters and return values
- **Inline Comments**: Use comments sparingly but effectively to explain why a piece of code is doing something complex, non-obvious, or tricky. Don't explain what the code is doing (the code itself should do that); explain the intent

---

**Last Updated**: August 2025  
**Version**: 1.0  
**Status**: Phase 0 Complete



## Phase 1: GUI Development

**Core Objective**: To iteratively develop a dedicated, functional, and aesthetically pleasing UI control panel for each of the 6 hardware devices.

### Part A: Global GUI Design & Functionality Standards

Before developing any individual device panel, it is critical to define the global standards that apply to the entire user interface. Every component built in Phase 1 must adhere to these principles to ensure a cohesive, intuitive, and professional application.

#### Aesthetics & Layout

**Theme**: The application will feature a Dark Mode theme as its primary and default look. The color palette should consist of dark gray backgrounds (e.g., #1e1e1e), slightly lighter container backgrounds (e.g., #2a2a2a), high-contrast text (off-white or light gray), and a primary accent color (e.g., a vibrant blue or cyan) for interactive elements.

**Rich Formatting**: We will move beyond plain HTML elements. The UI will be built using a professional component library (MUI) to provide a rich, modern feel. This includes the use of cards, elevation/shadows, smooth transitions, and high-quality icons (e.g., from Material Icons).

**Typography**: A clean, sans-serif font will be used throughout the application for readability. A clear typographic hierarchy (e.g., distinct sizes for titles, subtitles, and body text) will be established to guide the user's eye.

**Layout & Navigation**: A persistent Navigation Bar will be present at the top of the screen. It will contain links to switch between the "Home/Dashboard" view, each individual device control panel, and the "Experiment" view (which will be built in Phase 2).

A persistent Status Bar will be present at the bottom of the screen. This bar will display global system status, such as the connection state of the backend server and any global error messages.

#### Component Behavior & User Experience (UX)

This section defines how interactive elements must behave to provide a clear and responsive experience.

**Button Interaction Feedback**:
- **Pressed State**: All buttons must visually change when clicked (e.g., stay depressed, change color/shade)
- **In-Progress State**: For any action that is not instantaneous (i.e., any action that involves a backend call), the button must enter a disabled, "in-progress" state immediately upon being clicked. This state should be indicated by a loading spinner within the button and/or by changing the button text (e.g., from "Connect" to "Connecting..."). This prevents the user from clicking the button multiple times
- **Action Completion State**: Upon completion, the user must be notified of the outcome and the button should either return to its original state or display its current state (e.g., if Arm Laser is pressed and is successful it should display 'Disarm Laser' and be in the unpressed state, if failed it should return to its original state)
  - **Success**: A temporary, non-intrusive "toast" notification should appear (e.g., "Successfully connected to MIRcat Laser")
  - **Failure**: A more prominent toast notification should appear with a red color and a clear error message (e.g., "Error: Connection to MIRcat Laser failed")

**Validated Input Fields**:
- **Live Input**: The user must be able to freely type any value into an input box, including deleting the current content
- **Validation on Blur**: The input value should only be validated when the user "clicks out" of the input box (the "on blur" event)
- **Auto-Correction**: If the entered value is outside the acceptable min/max range, the input should automatically revert to the nearest valid value (e.g., if the max is 100 and the user enters 150, it reverts to 100 upon blur)
- **Visual Cues**: The valid range for the input (e.g., "10-100 nm") should be displayed as helper text directly below the input box so the user knows the limits beforehand

**Real-Time State Reflection**:
- All UI elements must accurately represent the current, true state of the hardware
- If a connection to a device is lost, its corresponding UI panel should be overlaid with a "Disconnected" message or have its controls disabled, with a clear visual indicator in the navigation or status bar
- Status indicators (e.g., "Armed," "Connected," "Idle") should be updated via websocket

### Part B: UI Skeleton and Component Scaffolding

**Core Objective**: To build the static, non-functional "shell" of the React application. This involves creating the main layout, navigation, status bar, and placeholder panels for each device. This will allow for early testing of the application's structure and aesthetics before any backend logic is implemented.

#### Agent Instructions:

**Step 0: Centralized Theme and State Provider Setup**

**Goal**: To configure the foundational providers for theming (MUI) and global state management at the root of the application.

**Agent Instructions**:
- **MUI Theme Provider**: Create a theme.ts file that defines our dark mode palette (colors, typography) as specified in Part A. In the main App.tsx or main.tsx file, wrap the entire application with MUI's ThemeProvider and pass our custom theme to it. This ensures all MUI components automatically inherit the correct dark mode styles
- **Global State/Context Provider (for Status Bar)**: Create a simple React Context (e.g., AppContext) that will manage global state, such as the backend connection status and any global error messages. Wrap the application in this context provider. This will allow the Statusbar component to easily access and display this information later without complex prop drilling

**Step 1: Setup Main Application Layout**

- **Central Layout Component**: In the `/frontend/src/components/global/` directory, create a MainLayout.tsx component. This component will define the overall page structure. It will render:
  - The Navbar component at the top
  - A main content area in the middle where the selected device panel will be displayed
  - The Statusbar component at the bottom
- **Integrate Layout**: Modify the root App.tsx file to use this MainLayout as the primary container for the application, wrapping the React Router's Outlet or children

**Step 2: Implement Navigation and Status Bars**

**Navigation Bar (Navbar.tsx)**:
- Create the Navbar component in `/frontend/src/components/global/`
- Using MUI components (AppBar, Toolbar, Button), create a static navigation bar
- It must contain navigation links for "Dashboard" and each of the hardware devices (e.g., "MIRcat", "PicoScope", etc.). For now, these links will point to placeholder routes
- **Icons**: Each navigation link should be accompanied by a relevant icon from the Material Icons library to improve visual recognition
- **Active Link Styling**: The link corresponding to the currently active page must be visually distinct (e.g., have a different background color or a brighter text color) to provide clear feedback to the user about their location in the app. React Router's NavLink component should be used to achieve this
- Apply the dark-mode aesthetic defined in Part A

**Status Bar (Statusbar.tsx)**:
- Create the Statusbar component in `/frontend/src/components/global/`
- Design a simple bar that docks to the bottom of the screen
- Add placeholder text elements for future use, such as:
  - A "Backend Status" indicator (e.g., a green dot with text "Connected")
  - A space for global notifications

**Step 3: Create Placeholder Device Panels**

**Generate Module Files**: 
- For each of the hardware devices, create its corresponding module directory and files within `/frontend/src/modules/`. For example, for the MIRcat laser:
  - Create `/frontend/src/modules/MIRcat/`
  - Inside, create a placeholder MIRcatView.tsx component

**Design Placeholder Panels**: Each ...View.tsx component should be a simple placeholder panel. It should consist of:
- An MUI Card or Paper component to act as a container
- A main title using an MUI Typography component (e.g., "<h1>MIRcat Laser Control Panel</h1>")
- A brief placeholder text, such as: "Controls for this device will be implemented here."

**Design Dashboard Panel**: Create a DashboardView.tsx component. This will be the main landing page. For now, it should contain:
- A Title message
- A grid or list of "status cards," one for each of the hardware devices
- Each status card should be a placeholder showing the device name and a placeholder "Status: Disconnected" message. This will eventually become a live overview of the entire system's health

**Step 4: Setup Routing**

**Configure Router**:
- In the main App.tsx or a dedicated router file, configure React Router
- **Define Routes**:
  - Create a route for each navigation link
  - `/` should map to a placeholder DashboardView.tsx component
  - `/mircat` should map to the MIRcatView.tsx component
  - `/picoscope` should map to the PicoScopeView.tsx component
  - ...and so on for all devices

**Step 5: Finalization and Testing**

**Commit to Repository**: Once the entire UI skeleton is in place, commit the changes to GitHub with a clear message, such as: "feat(frontend): Built static UI skeleton with navigation and placeholder panels."

**User Testing**: At this point, the frontend application should be fully runnable (npm start). The user should be able to:
- See the complete application layout with the dark theme
- Click on the navigation links to switch between the different (empty) device panels
- Verify that the overall look and feel meets the aesthetic goals before starting to adding functionality

