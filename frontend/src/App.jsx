/**
 * Main Application Component
 * Implements modular routing for hardware device control interfaces
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StatusBar from './components/StatusBar';

// Import hardware module views
import ArduinoUnoR4View from './modules/ArduinoUnoR4/ArduinoUnoR4View';
// TODO: Import other module views as they are implemented
// import ContinuumNdYAGView from './modules/ContinuumNdYAG/ContinuumNdYAGView';
// import DaylightMIRcatView from './modules/DaylightMIRcat/DaylightMIRcatView';
// import PicoScope5244DView from './modules/PicoScope5244D/PicoScope5244DView';
// import QuantumComposers9524View from './modules/QuantumComposers9524/QuantumComposers9524View';
// import ZurichHF2LIView from './modules/ZurichHF2LI/ZurichHF2LIView';
// import ExperimentView from './modules/Experiment/ExperimentView';

import './App.css';

// Placeholder components for modules not yet implemented
const PlaceholderView = ({ moduleName }) => (
  <div className="p-6">
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold">{moduleName}</h1>
      <p className="text-muted-foreground">
        This module is not yet implemented. It will be developed in Phase 1 of the project.
      </p>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md mx-auto">
        <p className="text-sm text-yellow-800">
          <strong>Status:</strong> Awaiting implementation
        </p>
      </div>
    </div>
  </div>
);

// Dashboard/Home view
const DashboardView = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-3xl font-bold">IR Pump-Probe Spectroscopy Control Interface</h1>
      <p className="text-muted-foreground">
        Unified control system for all hardware components
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Hardware Module Cards */}
      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">Arduino Uno R4 Minima</h3>
        <p className="text-sm text-muted-foreground mb-3">MUX Controller for Sample Positioning</p>
        <div className="text-xs text-green-600 font-medium">✓ Implemented</div>
      </div>

      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">Continuum Nd:YAG Laser</h3>
        <p className="text-sm text-muted-foreground mb-3">Pump Source (TTL Control)</p>
        <div className="text-xs text-yellow-600 font-medium">⏳ Pending</div>
      </div>

      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">Daylight MIRcat Laser</h3>
        <p className="text-sm text-muted-foreground mb-3">Mid-IR Probe Source</p>
        <div className="text-xs text-yellow-600 font-medium">⏳ Pending</div>
      </div>

      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">PicoScope 5244D</h3>
        <p className="text-sm text-muted-foreground mb-3">Oscilloscope for Data Collection</p>
        <div className="text-xs text-yellow-600 font-medium">⏳ Pending</div>
      </div>

      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">Quantum Composers 9524</h3>
        <p className="text-sm text-muted-foreground mb-3">Signal Generator for Synchronization</p>
        <div className="text-xs text-yellow-600 font-medium">⏳ Pending</div>
      </div>

      <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h3 className="font-semibold mb-2">Zurich HF2LI</h3>
        <p className="text-sm text-muted-foreground mb-3">Lock-in Amplifier</p>
        <div className="text-xs text-yellow-600 font-medium">⏳ Pending</div>
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-900 mb-2">Phase 0 Complete</h3>
      <p className="text-sm text-blue-800">
        Project structure and Arduino module have been implemented. 
        Ready to proceed with Phase 1 development of remaining hardware modules.
      </p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
            {/* Dashboard/Home Route */}
            <Route path="/" element={<DashboardView />} />
            <Route path="/dashboard" element={<DashboardView />} />
            
            {/* Hardware Module Routes */}
            <Route path="/arduino" element={<ArduinoUnoR4View />} />
            <Route path="/ndyag" element={<PlaceholderView moduleName="Continuum Nd:YAG Laser" />} />
            <Route path="/mircat" element={<PlaceholderView moduleName="Daylight MIRcat Laser" />} />
            <Route path="/picoscope" element={<PlaceholderView moduleName="PicoScope 5244D" />} />
            <Route path="/signal-generator" element={<PlaceholderView moduleName="Quantum Composers 9524" />} />
            <Route path="/lock-in" element={<PlaceholderView moduleName="Zurich HF2LI" />} />
            
            {/* Experiment Mode Route (Phase 2) */}
            <Route path="/experiment" element={<PlaceholderView moduleName="Experiment Mode" />} />
            
            {/* Redirect unknown routes to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <StatusBar />
      </div>
    </Router>
  );
}

export default App;

