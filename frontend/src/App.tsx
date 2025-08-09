import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppProvider } from './contexts/AppContext';
import darkTheme from './theme';
import MainLayout from './components/global/MainLayout';

// Import device view components
import DashboardView from './modules/Dashboard/DashboardView';
import ArduinoUnoR4View from './modules/ArduinoUnoR4/ArduinoUnoR4View';
import ContinuumSureliteView from './modules/ContinuumSurelite/ContinuumSureliteView';
import DaylightMIRcatView from './modules/DaylightMIRcat/DaylightMIRcatView';
import PicoScope5244DView from './modules/PicoScope5244D/PicoScope5244DView';
import QuantumComposers9524View from './modules/QuantumComposers9524/QuantumComposers9524View';
import ZurichHF2LIView from './modules/ZurichHF2LI/ZurichHF2LIView';
import ExperimentView from './modules/Experiment/ExperimentView';

/**
 * Main App component that sets up the application with:
 * - MUI Theme Provider for consistent dark mode styling
 * - Global App Context for state management
 * - React Router for navigation
 * - Main layout with navigation and status bars
 */
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<DashboardView />} />
              <Route path="arduino" element={<ArduinoUnoR4View />} />
              <Route path="continuum" element={<ContinuumSureliteView />} />
              <Route path="mircat" element={<DaylightMIRcatView />} />
              <Route path="picoscope" element={<PicoScope5244DView />} />
              <Route path="quantum" element={<QuantumComposers9524View />} />
              <Route path="zurich" element={<ZurichHF2LIView />} />
              <Route path="experiment" element={<ExperimentView />} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

