import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Circle as CircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { useAppContext } from '../../contexts/AppContext';

/**
 * Status bar component that displays global system status information
 * at the bottom of the application. Shows backend connection status,
 * device summary, global errors, and loading states.
 */
const StatusBar: React.FC = () => {
  const { state } = useAppContext();

  // Calculate device statistics
  const connectedDevices = state.devices.filter(device => device.connected).length;
  const totalDevices = state.devices.length;
  const hasErrors = state.devices.some(device => device.status === 'error');
  const hasWarnings = state.devices.some(device => device.status === 'busy');

  return (
    <AppBar
      position="static"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Loading Progress Bar */}
      {state.isLoading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
          }}
        />
      )}

      <Toolbar
        variant="dense"
        sx={{
          justifyContent: 'space-between',
          minHeight: 48,
          px: 2,
        }}
      >
        {/* Left Section: Backend Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircleIcon
              sx={{
                fontSize: 12,
                color: state.backendConnected ? 'success.main' : 'error.main',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              Backend: {state.backendConnected ? 'Connected' : 'Disconnected'}
            </Typography>
          </Box>

          {/* Device Summary */}
          <Typography variant="body2" color="text.secondary">
            Devices: {connectedDevices}/{totalDevices} Connected
          </Typography>

          {/* Status Indicators */}
          {hasErrors && (
            <Chip
              icon={<ErrorIcon />}
              label="Errors"
              color="error"
              size="small"
              variant="outlined"
            />
          )}

          {hasWarnings && (
            <Chip
              icon={<WarningIcon />}
              label="Busy"
              color="warning"
              size="small"
              variant="outlined"
            />
          )}
        </Box>

        {/* Center Section: Global Error Message */}
        {state.globalError && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ErrorIcon sx={{ color: 'error.main', fontSize: 16 }} />
            <Typography variant="body2" color="error.main">
              {state.globalError}
            </Typography>
          </Box>
        )}

        {/* Right Section: System Information */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Current Time */}
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleTimeString()}
          </Typography>

          {/* Loading Indicator */}
          {state.isLoading && (
            <Typography variant="body2" color="primary.main">
              Processing...
            </Typography>
          )}

          {/* Ready Status */}
          {!state.isLoading && state.backendConnected && connectedDevices > 0 && (
            <Chip
              label="System Ready"
              color="success"
              size="small"
              sx={{ fontWeight: 500 }}
            />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default StatusBar;

