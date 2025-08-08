/**
 * Navigation Bar Component
 * Provides navigation between hardware modules
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Cpu, 
  Zap, 
  Laser, 
  Activity, 
  Radio, 
  Gauge,
  FlaskConical 
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/arduino', label: 'Arduino MUX', icon: Cpu },
    { path: '/ndyag', label: 'Nd:YAG Laser', icon: Zap },
    { path: '/mircat', label: 'MIRcat Laser', icon: Laser },
    { path: '/picoscope', label: 'PicoScope', icon: Activity },
    { path: '/signal-generator', label: 'Signal Gen', icon: Radio },
    { path: '/lock-in', label: 'Lock-in Amp', icon: Gauge },
    { path: '/experiment', label: 'Experiment', icon: FlaskConical },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Logo/Title */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              IR Spectroscopy Control
            </h1>
            <p className="text-xs text-gray-500">Phase 0 - Project Structure</p>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.path}
                variant={active ? "default" : "ghost"}
                size="sm"
                asChild
                className={`flex items-center space-x-2 ${
                  active ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Link to={item.path}>
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 hidden lg:inline">System Ready</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

