/**
 * Toast notification service
 * Provides methods for showing different types of toast notifications
 */

// Generate a unique ID for each toast
const generateId = () => `toast-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

/**
 * Show a toast notification
 * 
 * @param {string} message - The message to display
 * @param {string} type - The type of toast (success, error, info, warning)
 * @param {number} duration - Duration in milliseconds before auto-dismiss
 * @returns {string} - The ID of the created toast
 */
const showToast = (message, type = 'info', duration = 3000) => {
  const id = generateId();
  
  // Dispatch a custom event that ToastContainer will listen for
  const event = new CustomEvent('toast', {
    detail: {
      id,
      type,
      message,
      duration
    }
  });
  
  window.dispatchEvent(event);
  
  return id;
};

/**
 * Show a success toast notification
 * 
 * @param {string} message - The message to display
 * @param {number} duration - Duration in milliseconds before auto-dismiss
 * @returns {string} - The ID of the created toast
 */
const success = (message, duration) => showToast(message, 'success', duration);

/**
 * Show an error toast notification
 * 
 * @param {string} message - The message to display
 * @param {number} duration - Duration in milliseconds before auto-dismiss
 * @returns {string} - The ID of the created toast
 */
const error = (message, duration) => showToast(message, 'error', duration);

/**
 * Show an info toast notification
 * 
 * @param {string} message - The message to display
 * @param {number} duration - Duration in milliseconds before auto-dismiss
 * @returns {string} - The ID of the created toast
 */
const info = (message, duration) => showToast(message, 'info', duration);

/**
 * Show a warning toast notification
 * 
 * @param {string} message - The message to display
 * @param {number} duration - Duration in milliseconds before auto-dismiss
 * @returns {string} - The ID of the created toast
 */
const warning = (message, duration) => showToast(message, 'warning', duration);

const toastService = {
  showToast,
  success,
  error,
  info,
  warning
};

export default toastService;