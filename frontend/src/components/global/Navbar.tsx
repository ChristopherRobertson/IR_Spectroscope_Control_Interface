import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Memory as ArduinoIcon,
  FlashOn as LaserIcon,
  Waves as SignalIcon,
  ShowChart as OscilloscopeIcon,
  Analytics as LockInIcon,
  Science as ExperimentIcon,
} from '@mui/icons-material';
import { useAppContext } from '../../contexts/AppContext';

/**
 * Navigation bar component with links to all device control panels
 * and the experiment interface. Includes visual indicators for device
 * connection status and active page highlighting.
 */
const Navbar: React.FC = () => {
  const location = useLocation();
  const { state } = useAppContext();

  // Navigation items configuration
  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      exact: true,
    },
    {
      path: '/arduino',
      label: 'Arduino',
      icon: <ArduinoIcon />,
      deviceId: 'arduino_uno_r4',
    },
    {
      path: '/continuum',
      label: 'Nd:YAG Laser',
      icon: <LaserIcon />,
      deviceId: 'continuum_surelite',
    },
    {
      path: '/mircat',
      label: 'MIRcat Laser',
      icon: <LaserIcon />,
      deviceId: 'daylight_mircat',
    },
    {
      path: '/picoscope',
      label: 'PicoScope',
      icon: <OscilloscopeIcon />,
      deviceId: 'picoscope_5244d',
    },
    {
      path: '/quantum',
      label: 'Signal Generator',
      icon: <SignalIcon />,
      deviceId: 'quantum_composers_9524',
    },
    {
      path: '/zurich',
      label: 'Lock-in Amplifier',
      icon: <LockInIcon />,
      deviceId: 'zurich_hf2li',
    },
    {
      path: '/experiment',
      label: 'Experiment',
      icon: <ExperimentIcon />,
    },
  ];

  // Helper function to check if a nav item is active
  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Helper function to get device status
  const getDeviceStatus = (deviceId?: string) => {
    if (!deviceId) return null;
    return state.devices.find(device => device.id === deviceId);
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Application Title */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            color: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Science />
          IR Spectroscopy Control
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          {navItems.map((item) => {
            const active = isActive(item.path, item.exact);
            const deviceStatus = getDeviceStatus(item.deviceId);

            return (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: active ? 'primary.main' : 'text.primary',
                  backgroundColor: active ? 'primary.main' : 'transparent',
                  color: active ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: active ? 600 : 400,
                  transition: 'all 0.2s ease-in-out',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: active 
                      ? 'primary.dark' 
                      : 'rgba(255, 255, 255, 0.08)',
                  },
                  // Remove default NavLink styling
                  textDecoration: 'none',
                  '&.active': {
                    textDecoration: 'none',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {item.label}
                    {/* Device Status Indicator */}
                    {deviceStatus && (
                      <Chip
                        size="small"
                        label={deviceStatus.connected ? 'ON' : 'OFF'}
                        color={deviceStatus.connected ? 'success' : 'default'}
                        sx={{
                          height: 16,
                          fontSize: '0.6rem',
                          '& .MuiChip-label': {
                            px: 0.5,
                          },
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Button>
            );
          })}
        </Box>

        {/* Backend Connection Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={state.backendConnected ? 'Backend Connected' : 'Backend Disconnected'}
            color={state.backendConnected ? 'success' : 'error'}
            size="small"
            sx={{
              fontWeight: 500,
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

