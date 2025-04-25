import React from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable Button component with consistent styling
 * @param {Object} props - Component props
 * @returns {JSX.Element} - Rendered component
 */
export const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  size = 'md',
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseClasses = "font-semibold rounded focus:outline-none transition-colors";
  
  const variantClasses = {
    primary: "theme-bg text-white hover:opacity-90",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline: "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-6",
    lg: "py-3 px-8 text-lg"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  const classes = `
    ${baseClasses} 
    ${variantClasses[variant] || variantClasses.primary} 
    ${sizeClasses[size] || sizeClasses.md} 
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button 
      className={classes} 
      onClick={onClick} 
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;