/**
 * Status Bar Component
 * Displays system status and connection information
 */

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Wifi, 
  WifiOff, 
  Clock, 
  Server,
  AlertTriangle 
} from 'lucide-react';

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [apiStatus, setApiStatus] = useState('unknown');
  const [connectedDevices, setConnectedDevices] = useState(0);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Check API status periodically
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setApiStatus('connected');
          const data = await response.json();
          setConnectedDevices(data.modules_loaded || 0);
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        setApiStatus('disconnected');
      }
    };

    // Check immediately
    checkApiStatus();

    // Check every 30 seconds
    const interval = setInterval(checkApiStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getApiStatusBadge = () => {
    switch (apiStatus) {
      case 'connected':
        return (
          <Badge variant="default" className="bg-green-500 text-white">
            <Server className="w-3 h-3 mr-1" />
            API Connected
          </Badge>
        );
      case 'disconnected':
        return (
          <Badge variant="destructive">
            <WifiOff className="w-3 h-3 mr-1" />
            API Disconnected
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            API Error
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Server className="w-3 h-3 mr-1" />
            Checking...
          </Badge>
        );
    }
  };

  return (
    <footer className="bg-gray-100 border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between text-sm">
        {/* Left side - API and device status */}
        <div className="flex items-center space-x-4">
          {getApiStatusBadge()}
          
          <Separator orientation="vertical" className="h-4" />
          
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">
              {connectedDevices} module{connectedDevices !== 1 ? 's' : ''} loaded
            </span>
          </div>
        </div>

        {/* Center - Project phase */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Phase 0: Project Structure Complete
          </Badge>
        </div>

        {/* Right side - Current time */}
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 font-mono">
            {formatTime(currentTime)}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default StatusBar;

