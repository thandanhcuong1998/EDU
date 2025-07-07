import React from 'react';
import PropTypes from 'prop-types';

const RadioOption = ({ 
  option, 
  pronunciation, 
  image, 
  isSelected, 
  isCorrect, 
  onSelect 
}) => {
  const getClassName = () => {
    let className = 'radio-option';
    
    if (isSelected) {
      className += ' radio-option--selected';
      if (isCorrect === true) {
        className += ' radio-option--success';
      } else if (isCorrect === false) {
        className += ' radio-option--fail';
      }
    }
    
    return className;
  };

  return (
    <div
      className={getClassName()}
      onClick={onSelect}
    >
      {image && <img src={image} alt={option} className="radio-option__image" />}
      <ruby className="radio-option__text">
        {option}
        {pronunciation && (
          <>
            <rp>(</rp>
            <rt>{pronunciation}</rt>
            <rp>)</rp>
          </>
        )}
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