import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types for global application state
export interface DeviceStatus {
  id: string;
  name: string;
  connected: boolean;
  status: 'idle' | 'busy' | 'error' | 'disconnected';
  lastUpdate: Date;
}

export interface AppState {
  backendConnected: boolean;
  devices: DeviceStatus[];
  globalError: string | null;
  isLoading: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  duration?: number; // Auto-dismiss after this many ms
}

// Action types for state updates
export type AppAction =
  | { type: 'SET_BACKEND_CONNECTION'; payload: boolean }
  | { type: 'UPDATE_DEVICE_STATUS'; payload: DeviceStatus }
  | { type: 'SET_GLOBAL_ERROR'; payload: string | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' };

// Initial state
const initialState: AppState = {
  backendConnected: false,
  devices: [
    {
      id: 'arduino_uno_r4',
      name: 'Arduino Uno R4',
      connected: false,
      status: 'disconnected',
      lastUpdate: new Date(),
    },
    {
      id: 'continuum_surelite',
      name: 'Continuum Nd:YAG Laser',
      connected: false,
      status: 'disconnected',
      lastUpdate: new Date(),
    },
    {
      id: 'daylight_mircat',
      name: 'Daylight MIRcat Laser',
      connected: false,
      status: 'disconnected',
      lastUpdate: new Date(),
    },
    {
      id: 'picoscope_5244d',
      name: 'PicoScope 5244D',
      connected: false,
      status: 'disconnected',
      lastUpdate: new Date(),
    },
    {
      id: 'quantum_composers_9524',
      name: 'Quantum Composers 9524',
      connected: false,
      status: 'disconnected',
      lastUpdate: new Date(),
    },
    {
      id: 'zurich_hf2li',
      name: 'Zurich HF2LI',
      connected: false,
      status: 'disconnected',
      lastUpdate: new Date(),
    },
  ],
  globalError: null,
  isLoading: false,
  notifications: [],
};

// Reducer function
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_BACKEND_CONNECTION':
      return {
        ...state,
        backendConnected: action.payload,
      };

    case 'UPDATE_DEVICE_STATUS':
      return {
        ...state,
        devices: state.devices.map(device =>
          device.id === action.payload.id
            ? { ...action.payload, lastUpdate: new Date() }
            : device
        ),
      };

    case 'SET_GLOBAL_ERROR':
      return {
        ...state,
        globalError: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'ADD_NOTIFICATION':
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      };
      return {
        ...state,
        notifications: [...state.notifications, newNotification],
      };

    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };

    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };

    default:
      return state;
  }
}

// Context creation
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

// Helper functions for common actions
export function useAppActions() {
  const { dispatch } = useAppContext();

  return {
    setBackendConnection: (connected: boolean) =>
      dispatch({ type: 'SET_BACKEND_CONNECTION', payload: connected }),

    updateDeviceStatus: (device: DeviceStatus) =>
      dispatch({ type: 'UPDATE_DEVICE_STATUS', payload: device }),

    setGlobalError: (error: string | null) =>
      dispatch({ type: 'SET_GLOBAL_ERROR', payload: error }),

    setLoading: (loading: boolean) =>
      dispatch({ type: 'SET_LOADING', payload: loading }),

    addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) =>
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification }),

    removeNotification: (id: string) =>
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id }),

    clearNotifications: () =>
      dispatch({ type: 'CLEAR_NOTIFICATIONS' }),

    // Convenience methods for common notification types
    showSuccess: (message: string, duration = 3000) =>
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { type: 'success', message, duration },
      }),

    showError: (message: string, duration = 5000) =>
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { type: 'error', message, duration },
      }),

    showWarning: (message: string, duration = 4000) =>
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { type: 'warning', message, duration },
      }),

    showInfo: (message: string, duration = 3000) =>
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { type: 'info', message, duration },
      }),
  };
}

export default AppContext;

