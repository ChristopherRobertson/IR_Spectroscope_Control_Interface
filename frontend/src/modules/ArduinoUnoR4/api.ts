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
  mux_position?: number;
  switch_states?: boolean[];
  last_update?: string;
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
): Promise<T> => {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions: RequestOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
};

/**
 * Arduino API object with all methods
 */
export const arduinoApi = {
  /**
   * Connect to Arduino device
   */
  connect: async (): Promise<ArduinoStatus> => {
    return apiRequest<ArduinoStatus>('/connect', {
      method: 'POST',
    });
  },

  /**
   * Disconnect from Arduino device
   */
  disconnect: async (): Promise<ArduinoStatus> => {
    return apiRequest<ArduinoStatus>('/disconnect', {
      method: 'POST',
    });
  },

  /**
   * Get Arduino device status
   */
  getStatus: async (): Promise<ArduinoStatus> => {
    return apiRequest<ArduinoStatus>('/status', {
      method: 'GET',
    });
  },

  /**
   * Get current MUX position
   */
  getMuxPosition: async (): Promise<MuxPosition> => {
    return apiRequest<MuxPosition>('/mux/position', {
      method: 'GET',
    });
  },

  /**
   * Set MUX position
   */
  setMuxPosition: async (position: number): Promise<MuxPosition> => {
    return apiRequest<MuxPosition>('/mux/position', {
      method: 'POST',
      body: JSON.stringify({ position }),
    });
  },

  /**
   * Toggle a digital switch
   */
  toggleSwitch: async (switchIndex: number): Promise<ArduinoStatus> => {
    return apiRequest<ArduinoStatus>(`/switch/${switchIndex}/toggle`, {
      method: 'POST',
    });
  },

  /**
   * Get available MUX positions
   */
  getAvailablePositions: async (): Promise<AvailablePositions> => {
    return apiRequest<AvailablePositions>('/mux/positions', {
      method: 'GET',
    });
  },

  /**
   * Test Arduino connection
   */
  testConnection: async (): Promise<boolean> => {
    try {
      const response = await arduinoApi.getStatus();
      return response.connected === true;
    } catch (error) {
      return false;
    }
  },
};

/**
 * Arduino API utilities
 */
export const utils = {
  /**
   * Validate position value
   */
  isValidPosition: (position: number): boolean => {
    return Number.isInteger(position) && position >= 0 && position <= 7;
  },

  /**
   * Format position for display
   */
  formatPosition: (position: number | null): string => {
    return position !== null ? `Position ${position}` : 'Unknown';
  },

  /**
   * Get connection status color
   */
  getStatusColor: (connected: boolean): string => {
    return connected ? 'success' : 'error';
  },
};

// Export types for use in components
export type { ApiResponse, ArduinoStatus, MuxPosition, AvailablePositions };

