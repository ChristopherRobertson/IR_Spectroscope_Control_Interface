import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Memory as ArduinoIcon,
  Power as ConnectIcon,
  PowerOff as DisconnectIcon,
  Error as ErrorIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { useAppActions } from '../../contexts/AppContext';
import { arduinoApi } from './api';

interface ArduinoStatus {
  connected: boolean;
  port: string;
  mux_position: number;
  switch_states: boolean[];
  last_update: string;
}

/**
 * Arduino Uno R4 Control Panel
 * Provides interface for MUX position control and digital switch management
 */
const ArduinoUnoR4View: React.FC = () => {
  const [status, setStatus] = useState<ArduinoStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError, updateDeviceStatus } = useAppActions();

  // Fetch status on component mount
  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await arduinoApi.getStatus();
      setStatus(response);
      
      // Update global device status
      updateDeviceStatus({
        id: 'arduino_uno_r4',
        name: 'Arduino Uno R4',
        connected: response.connected,
        status: response.connected ? 'idle' : 'disconnected',
        lastUpdate: new Date(),
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch status';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError(null);
      await arduinoApi.connect();
      await fetchStatus();
      showSuccess('Successfully connected to Arduino');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      setError(null);
      await arduinoApi.disconnect();
      await fetchStatus();
      showSuccess('Successfully disconnected from Arduino');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSetMuxPosition = async (position: number) => {
    try {
      setLoading(true);
      setError(null);
      await arduinoApi.setMuxPosition(position);
      await fetchStatus();
      showSuccess(`MUX position set to ${position}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set MUX position';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleSwitch = async (switchIndex: number) => {
    try {
      setLoading(true);
      setError(null);
      await arduinoApi.toggleSwitch(switchIndex);
      await fetchStatus();
      showSuccess(`Switch ${switchIndex + 1} toggled`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle switch';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <ArduinoIcon sx={{ fontSize: 48, color: 'success.main', mr: 2 }} />
        <Box>
          <Typography variant="h4" component="h1" gutterBottom>
            Arduino Uno R4 Minima
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            MUX Controller for Sample Positioning
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <Chip
            label={status?.connected ? 'Connected' : 'Disconnected'}
            color={status?.connected ? 'success' : 'default'}
            icon={status?.connected ? <CheckIcon /> : <ErrorIcon />}
          />
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Connection Control */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {status?.connected ? (
                  <CheckIcon color="success" />
                ) : (
                  <ErrorIcon color="warning" />
                )}
                Connection Status
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Serial Port: {status?.port || 'Not connected'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status: {status?.connected ? 'Active' : 'Inactive'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={16} /> : <ConnectIcon />}
                  onClick={handleConnect}
                  disabled={loading || status?.connected}
                >
                  Connect
                </Button>
                <Button
                  variant="outlined"
                  startIcon={loading ? <CircularProgress size={16} /> : <DisconnectIcon />}
                  onClick={handleDisconnect}
                  disabled={loading || !status?.connected}
                >
                  Disconnect
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* MUX Position Control */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                MUX Position Control
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Current Position: {status?.mux_position ?? 'Unknown'}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={1}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((position) => (
                  <Grid item xs={3} key={position}>
                    <Button
                      variant={status?.mux_position === position ? 'contained' : 'outlined'}
                      onClick={() => handleSetMuxPosition(position)}
                      disabled={loading || !status?.connected}
                      size="small"
                      fullWidth
                    >
                      Pos {position}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Switch Control */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Digital Switch Control
              </Typography>
              
              {status?.switch_states?.length ? (
                <Grid container spacing={2}>
                  {status.switch_states.map((state, index) => (
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={state}
                            onChange={() => handleToggleSwitch(index)}
                            disabled={loading || !status?.connected}
                          />
                        }
                        label={`Switch ${index + 1}`}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No switch data available
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Status Information */}
        {status && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Status Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Last Update: {new Date(status.last_update).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Connection: {status.connected ? 'Active' : 'Inactive'}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ArduinoUnoR4View;

