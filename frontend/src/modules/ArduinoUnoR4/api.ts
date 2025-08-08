/**
 * Arduino Uno R4 Minima API Module
 * Handles all API calls to the Arduino backend endpoints
 */

const API_BASE = '/api/arduino';

// Type definitions
interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

interface ArduinoStatus {
  connected: boolean;
  port?: string;
  firmware_version?: string;
  last_heartbeat?: string;
}

interface MuxPosition {
  current_position: number | null;
  target_position?: number;
  is_moving?: boolean;
}

interface AvailablePositions {
  positions: number[];
  min_position: number;
  max_position: number;
}

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Generic API request handler
 * @param endpoint - API endpoint
 * @param options - Fetch options
 * @returns API response
 */
const apiRequest = async <T = any>(
  endpoint: string, 
  options: RequestOptions = {}
): Promise<ApiResponse<T>> => {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions: RequestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data: ApiResponse<T> = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
};

/**
 * Connect to Arduino device
 * @returns Connection response
 */
export const connect = async (): Promise<ApiResponse<ArduinoStatus>> => {
  return apiRequest<ArduinoStatus>('/connect', {
    method: 'POST',
  });
};

/**
 * Disconnect from Arduino device
 * @returns Disconnection response
 */
export const disconnect = async (): Promise<ApiResponse<ArduinoStatus>> => {
  return apiRequest<ArduinoStatus>('/disconnect', {
    method: 'POST',
  });
};

/**
 * Get Arduino device status
 * @returns Status response
 */
export const getStatus = async (): Promise<ApiResponse<ArduinoStatus>> => {
  return apiRequest<ArduinoStatus>('/status', {
    method: 'GET',
  });
};

/**
 * Get current MUX position
 * @returns Position response
 */
export const getMuxPosition = async (): Promise<ApiResponse<MuxPosition>> => {
  return apiRequest<MuxPosition>('/mux/position', {
    method: 'GET',
  });
};

/**
 * Set MUX position
 * @param position - Target position
 * @returns Set position response
 */
export const setMuxPosition = async (position: number): Promise<ApiResponse<MuxPosition>> => {
  return apiRequest<MuxPosition>('/mux/position', {
    method: 'POST',
    body: JSON.stringify({ position }),
  });
};

/**
 * Get available MUX positions
 * @returns Available positions response
 */
export const getAvailablePositions = async (): Promise<ApiResponse<AvailablePositions>> => {
  return apiRequest<AvailablePositions>('/mux/positions', {
    method: 'GET',
  });
};

/**
 * Test Arduino connection
 * @returns Connection test result
 */
export const testConnection = async (): Promise<boolean> => {
  try {
    const response = await getStatus();
    return response.status === 'success' && response.data?.connected === true;
  } catch (error) {
    return false;
  }
};

/**
 * Arduino API utilities
 */
export const utils = {
  /**
   * Validate position value
   * @param position - Position to validate
   * @returns Is valid position
   */
  isValidPosition: (position: number): boolean => {
    return Number.isInteger(position) && position >= 1 && position <= 8;
  },

  /**
   * Format position for display
   * @param position - Position number
   * @returns Formatted position
   */
  formatPosition: (position: number | null): string => {
    return position !== null ? `Position ${position}` : 'Unknown';
  },

  /**
   * Get connection status color
   * @param connected - Connection status
   * @returns Status color class
   */
  getStatusColor: (connected: boolean): string => {
    return connected ? 'text-green-600' : 'text-red-600';
  },
};

// Export types for use in components
export type { ApiResponse, ArduinoStatus, MuxPosition, AvailablePositions };

