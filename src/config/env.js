/**
 * Environment configuration module
 * Centralizes access to environment variables
 */

const environment = {
  // API URLs
  apiUrl: import.meta.env.VITE_API_URL || 'https://api.japanese-edu.com',
  audioApiUrl: import.meta.env.VITE_AUDIO_API_URL || 'https://proxy.junookyo.workers.dev/',
  
  // Environment
  environment: import.meta.env.VITE_ENV || 'development',
  isDevelopment: import.meta.env.VITE_ENV === 'development',
  isProduction: import.meta.env.VITE_ENV === 'production',
  
  // Feature Flags
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  enableMockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
  
  // Utility function to log only in development
  log: (...arguments_) => {
    if (import.meta.env.VITE_ENABLE_LOGGING === 'true') {
      console.log(...arguments_);
    }
  },
  
  // Utility function to log errors in all environments
  logError: (...arguments_) => {
    console.error(...arguments_);
  }
};

export default environment;