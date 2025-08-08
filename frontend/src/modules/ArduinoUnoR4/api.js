/**
 * Arduino Uno R4 Minima API Module
 * Handles all API calls to the Arduino backend endpoints
 */

const API_BASE = '/api/arduino';

/**
 * Generic API request handler
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise<object>} API response
 */
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    const data = await response.json();
    
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
 * @returns {Promise<object>} Connection response
 */
export const connect = async () => {
  return apiRequest('/connect', {
    method: 'POST',
  });
};

/**
 * Disconnect from Arduino device
 * @returns {Promise<object>} Disconnection response
 */
export const disconnect = async () => {
  return apiRequest('/disconnect', {
    method: 'POST',
  });
};

/**
 * Get Arduino device status
 * @returns {Promise<object>} Status response
 */
export const getStatus = async () => {
  return apiRequest('/status', {
    method: 'GET',
  });
};

/**
 * Get current MUX position
 * @returns {Promise<object>} Position response
 */
export const getMuxPosition = async () => {
  return apiRequest('/mux/position', {
    method: 'GET',
  });
};

/**
 * Set MUX position
 * @param {number} position - Target position
 * @returns {Promise<object>} Set position response
 */
export const setMuxPosition = async (position) => {
  return apiRequest('/mux/position', {
    method: 'POST',
    body: JSON.stringify({ position }),
  });
};

/**
 * Get available MUX positions
 * @returns {Promise<object>} Available positions response
 */
export const getAvailablePositions = async () => {
  return apiRequest('/mux/positions', {
    method: 'GET',
  });
};

/**
 * Test Arduino connection
 * @returns {Promise<boolean>} Connection test result
 */
export const testConnection = async () => {
  try {
    const response = await getStatus();
    return response.status === 'success' && response.data.connected;
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
   * @param {number} position - Position to validate
   * @returns {boolean} Is valid position
   */
  isValidPosition: (position) => {
    return Number.isInteger(position) && position >= 1 && position <= 8;
  },

  /**
   * Format position for display
   * @param {number} position - Position number
   * @returns {string} Formatted position
   */
  formatPosition: (position) => {
    return position !== null ? `Position ${position}` : 'Unknown';
  },

  /**
   * Get connection status color
   * @param {boolean} connected - Connection status
   * @returns {string} Status color class
   */
  getStatusColor: (connected) => {
    return connected ? 'text-green-600' : 'text-red-600';
  },
};

