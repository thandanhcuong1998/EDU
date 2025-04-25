import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Toast.css';

/**
 * Individual Toast notification component
 * 
 * @param {Object} props - Component props
 * @param {string} props.id - Unique identifier for the toast
 * @param {string} props.type - Type of toast (success, error, info, warning)
 * @param {string} props.message - Message to display
 * @param {number} props.duration - Duration in milliseconds before auto-dismiss
 * @param {Function} props.onClose - Function to call when toast is closed
 * @returns {JSX.Element} - Rendered component
 */
const Toast = ({ id, type = 'info', message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-dismiss after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Allow time for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, id, onClose]);
  
  // Handle manual close
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300); // Allow time for exit animation
  };
  
  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
      default:
        return 'ℹ';
    }
  };
  
  return (
    <div 
      className={`toast toast-${type} ${isVisible ? 'toast-visible' : 'toast-hidden'}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        <p>{message}</p>
      </div>
      <button 
        className="toast-close" 
        onClick={handleClose}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']),
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Toast;