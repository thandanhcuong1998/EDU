import React from 'react';
import PropTypes from 'prop-types';

/**
 * RadioOption component renders a single option in the Radio question type
 * 
 * @param {Object} props - Component props
 * @param {string} props.option - The text content of the option
 * @param {string} props.pronunciation - The pronunciation guide for the option
 * @param {string} props.image - Optional image URL for the option
 * @param {boolean} props.isSelected - Whether this option is currently selected
 * @param {boolean} props.isCorrect - Whether the answer is correct (null if not yet answered)
 * @param {Function} props.onSelect - Function to call when this option is selected
 * @returns {React.ReactElement} The rendered RadioOption component
 */
const RadioOption = ({ 
  option, 
  pronunciation, 
  image, 
  isSelected, 
  isCorrect, 
  onSelect 
}) => {
  // Determine CSS classes based on selection and correctness
  const getClassName = () => {
    let className = 'options';
    
    if (isSelected) {
      className += ' selected';
      
      if (isCorrect === true) {
        className += ' success';
      } else if (isCorrect === false) {
        className += ' isFail';
      }
    }
    
    return className;
  };

  return (
    <div
      className={getClassName()}
      onClick={onSelect}
    >
      {image && <img src={image} alt="option" />}
      <ruby>
        {option}
        <rp>(</rp>
        <rt>{pronunciation}</rt>
        <rp>)</rp>
      </ruby>
    </div>
  );
};

RadioOption.propTypes = {
  option: PropTypes.string.isRequired,
  pronunciation: PropTypes.string,
  image: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  isCorrect: PropTypes.bool,
  onSelect: PropTypes.func.isRequired
};

RadioOption.defaultProps = {
  pronunciation: '',
  image: null,
  isCorrect: null
};

export default RadioOption;