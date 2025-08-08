/**
 * Arduino Uno R4 Minima Control Interface
 * Main view component for MUX controller
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, CheckCircle, Loader2, Usb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import * as api from './api';
import './ArduinoUnoR4.module.css';

const ArduinoUnoR4View = () => {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [currentPosition, setCurrentPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [availablePositions, setAvailablePositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deviceInfo, setDeviceInfo] = useState(null);

  // Load initial data
  useEffect(() => {
    loadDeviceStatus();
    loadAvailablePositions();
  }, []);

  const loadDeviceStatus = async () => {
    try {
      const response = await api.getStatus();
      if (response.status === 'success') {
        setDeviceInfo(response.data);
        setConnectionStatus(response.data.connected ? 'connected' : 'disconnected');
        setCurrentPosition(response.data.current_position);
      }
    } catch (err) {
      setError('Failed to load device status');
    }
  };

  const loadAvailablePositions = async () => {
    try {
      const response = await api.getAvailablePositions();
      if (response.status === 'success') {
        setAvailablePositions(response.data.positions);
      }
    } catch (err) {
      setError('Failed to load available positions');
    }
  };

  const handleConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.connect();
      if (response.status === 'success') {
        setConnectionStatus('connected');
        await loadDeviceStatus();
      } else {
        setError(response.message || 'Connection failed');
      }
    } catch (err) {
      setError('Failed to connect to Arduino');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.disconnect();
      if (response.status === 'success') {
        setConnectionStatus('disconnected');
        setCurrentPosition(null);
      } else {
        setError(response.message || 'Disconnection failed');
      }
    } catch (err) {
      setError('Failed to disconnect from Arduino');
    } finally {
      setLoading(false);
    }
  };

  const handleSetPosition = async () => {
    if (!selectedPosition) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await api.setMuxPosition(parseInt(selectedPosition));
      if (response.status === 'success') {
        setCurrentPosition(parseInt(selectedPosition));
        setSelectedPosition('');
      } else {
        setError(response.message || 'Failed to set position');
      }
    } catch (err) {
      setError('Failed to set MUX position');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'disconnected':
        return <Badge variant="secondary"><AlertCircle className="w-3 h-3 mr-1" />Disconnected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Arduino Uno R4 Minima</h1>
          <p className="text-muted-foreground">MUX Controller for Sample Positioning</p>
        </div>
        {getStatusBadge()}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Connection Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Usb className="w-5 h-5 mr-2" />
              Connection Control
            </CardTitle>
            <CardDescription>
              Manage connection to Arduino device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {deviceInfo && (
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Port:</span> {deviceInfo.port}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Device:</span> {deviceInfo.device_type}
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button 
                onClick={handleConnect}
                disabled={connectionStatus === 'connected' || loading}
                className="flex-1"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Connect
              </Button>
              <Button 
                variant="outline"
                onClick={handleDisconnect}
                disabled={connectionStatus === 'disconnected' || loading}
                className="flex-1"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* MUX Position Control */}
        <Card>
          <CardHeader>
            <CardTitle>MUX Position Control</CardTitle>
            <CardDescription>
              Set sample position using the multiplexer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium">Current Position:</span> 
                <span className="ml-2 font-mono">
                  {currentPosition !== null ? currentPosition : 'Unknown'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Select 
                value={selectedPosition} 
                onValueChange={setSelectedPosition}
                disabled={connectionStatus !== 'connected' || loading}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {availablePositions.map((position) => (
                    <SelectItem key={position} value={position.toString()}>
                      Position {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                onClick={handleSetPosition}
                disabled={!selectedPosition || connectionStatus !== 'connected' || loading}
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Set
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Position Grid */}
      {connectionStatus === 'connected' && availablePositions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Position Selection</CardTitle>
            <CardDescription>
              Click to quickly set MUX position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {availablePositions.map((position) => (
                <Button
                  key={position}
                  variant={currentPosition === position ? "default" : "outline"}
                  onClick={() => {
                    setSelectedPosition(position.toString());
                    handleSetPosition();
                  }}
                  disabled={loading}
                  className="aspect-square"
                >
                  {position}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ArduinoUnoR4View;

