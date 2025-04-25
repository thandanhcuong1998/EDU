/**
 * Environment configuration module
 * Centralizes access to environment variables
 */

const env = {
  // API URLs
  apiUrl: process.env.REACT_APP_API_URL || 'https://api.japanese-edu.com',
  audioApiUrl: process.env.REACT_APP_AUDIO_API_URL || 'https://proxy.junookyo.workers.dev/',
  
  // Environment
  environment: process.env.REACT_APP_ENV || 'development',
  isDevelopment: process.env.REACT_APP_ENV === 'development',
  isProduction: process.env.REACT_APP_ENV === 'production',
  
  // Feature Flags
  enableLogging: process.env.REACT_APP_ENABLE_LOGGING === 'true',
  enableMockData: process.env.REACT_APP_ENABLE_MOCK_DATA === 'true',
  
  // Utility function to log only in development
  log: (...args) => {
    if (process.env.REACT_APP_ENABLE_LOGGING === 'true') {
      console.log(...args);
    }
  },
  
  // Utility function to log errors in all environments
  logError: (...args) => {
    console.error(...args);
  }
};

export default env;