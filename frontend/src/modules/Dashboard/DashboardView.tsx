import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Memory as ArduinoIcon,
  FlashOn as LaserIcon,
  Waves as SignalIcon,
  ShowChart as OscilloscopeIcon,
  Analytics as LockInIcon,
  Science as ExperimentIcon,
  Launch as LaunchIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

/**
 * Dashboard view component that provides an overview of all hardware devices
 * and their current status. Serves as the main landing page for the application.
 */
const DashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();

  // Device configuration with navigation and display information
  const deviceCards = [
    {
      id: 'arduino_uno_r4',
      title: 'Arduino Uno R4',
      subtitle: 'MUX Controller',
      description: 'Sample positioning and switching control',
      icon: <ArduinoIcon sx={{ fontSize: 40 }} />,
      path: '/arduino',
      color: '#4caf50',
    },
    {
      id: 'continuum_surelite',
      title: 'Continuum Nd:YAG',
      subtitle: 'Pump Laser',
      description: 'High-energy pump source (TTL controlled)',
      icon: <LaserIcon sx={{ fontSize: 40 }} />,
      path: '/continuum',
      color: '#f44336',
    },
    {
      id: 'daylight_mircat',
      title: 'Daylight MIRcat',
      subtitle: 'Probe Laser',
      description: 'Tunable mid-IR probe source',
      icon: <LaserIcon sx={{ fontSize: 40 }} />,
      path: '/mircat',
      color: '#ff9800',
    },
    {
      id: 'picoscope_5244d',
      title: 'PicoScope 5244D',
      subtitle: 'Oscilloscope',
      description: 'High-speed data acquisition and analysis',
      icon: <OscilloscopeIcon sx={{ fontSize: 40 }} />,
      path: '/picoscope',
      color: '#2196f3',
    },
    {
      id: 'quantum_composers_9524',
      title: 'Quantum Composers',
      subtitle: 'Signal Generator',
      description: 'Precision timing and synchronization',
      icon: <SignalIcon sx={{ fontSize: 40 }} />,
      path: '/quantum',
      color: '#9c27b0',
    },
    {
      id: 'zurich_hf2li',
      title: 'Zurich HF2LI',
      subtitle: 'Lock-in Amplifier',
      description: 'Sensitive signal detection and analysis',
      icon: <LockInIcon sx={{ fontSize: 40 }} />,
      path: '/zurich',
      color: '#607d8b',
    },
  ];

  // Get device status from global state
  const getDeviceStatus = (deviceId: string) => {
    return state.devices.find(device => device.id === deviceId);
  };

  // Calculate system statistics
  const connectedDevices = state.devices.filter(device => device.connected).length;
  const totalDevices = state.devices.length;
  const systemHealth = connectedDevices / totalDevices;

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 300 }}>
          IR Pump-Probe Spectroscopy
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Unified Control Interface
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Monitor and control all hardware components from this central dashboard.
          Select a device to access its dedicated control panel.
        </Typography>

        {/* System Status Overview */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Status
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Devices Connected: {connectedDevices}/{totalDevices}
              </Typography>
              <Chip
                label={state.backendConnected ? 'Backend Online' : 'Backend Offline'}
                color={state.backendConnected ? 'success' : 'error'}
                size="small"
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={systemHealth * 100}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: systemHealth > 0.5 ? '#4caf50' : '#ff9800',
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              System Health: {Math.round(systemHealth * 100)}%
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Device Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {deviceCards.map((device) => {
          const deviceStatus = getDeviceStatus(device.id);
          const isConnected = deviceStatus?.connected || false;
          const status = deviceStatus?.status || 'disconnected';

          return (
            <Grid item xs={12} sm={6} lg={4} key={device.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease-in-out',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
                  },
                }}
                onClick={() => navigate(device.path)}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        color: device.color,
                        mr: 2,
                        opacity: isConnected ? 1 : 0.5,
                      }}
                    >
                      {device.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2">
                        {device.title}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {device.subtitle}
                      </Typography>
                    </Box>
                    <Chip
                      label={isConnected ? 'Connected' : 'Offline'}
                      color={isConnected ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {device.description}
                  </Typography>

                  {/* Status Indicator */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      Status:
                    </Typography>
                    <Chip
                      label={status.charAt(0).toUpperCase() + status.slice(1)}
                      color={
                        status === 'idle' ? 'success' :
                        status === 'busy' ? 'warning' :
                        status === 'error' ? 'error' : 'default'
                      }
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                </CardContent>

                <CardActions>
                  <Button
                    size="small"
                    startIcon={<LaunchIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(device.path);
                    }}
                    sx={{ ml: 'auto' }}
                  >
                    Open Control Panel
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Experiment Mode Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <ExperimentIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2">
                Experiment Mode
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Automated Data Acquisition
              </Typography>
            </Box>
            <Chip
              label="Phase 2"
              color="info"
              size="small"
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Orchestrate synchronized measurements across all devices with automated
            data collection and analysis workflows.
          </Typography>

          <Button
            variant="outlined"
            startIcon={<ExperimentIcon />}
            onClick={() => navigate('/experiment')}
            disabled={connectedDevices < totalDevices}
          >
            Launch Experiment Mode
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardView;

