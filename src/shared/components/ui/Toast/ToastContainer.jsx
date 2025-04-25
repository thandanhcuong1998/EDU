import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';
import './Toast.css';

/**
 * Container for managing multiple toast notifications
 * This component is rendered as a portal at the root level of the DOM
 */
const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  
  // Remove a toast by id
  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);
  
  // Listen for toast events
  useEffect(() => {
    const handleToastEvent = (event) => {
      const { id, type, message, duration } = event.detail;
      
      // Add new toast
      setToasts(prevToasts => [
        ...prevToasts,
        { id, type, message, duration }
      ]);
    };
    
    // Add event listener
    window.addEventListener('toast', handleToastEvent);
    
    // Clean up
    return () => {
      window.removeEventListener('toast', handleToastEvent);
    };
  }, []);
  
  // Create portal container if it doesn't exist
  useEffect(() => {
    let portalContainer = document.getElementById('toast-portal');
    
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = 'toast-portal';
      document.body.appendChild(portalContainer);
    }
    
    return () => {
      if (portalContainer && portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer);
      }
    };
  }, []);
  
  // Render nothing if no toasts
  if (toasts.length === 0) {
    return null;
  }
  
  // Render toasts as a portal
  return ReactDOM.createPortal(
    <div className="toast-container">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>,
    document.getElementById('toast-portal')
  );
};

export default ToastContainer;