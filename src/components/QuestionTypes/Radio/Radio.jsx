import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../../Helpers/util.jsx';
import RadioOption from './RadioOption';
import './Radio.scss';

/**
 * Radio component renders a multiple choice question with radio-style options
 * 
 * @param {Object} props - Component props
 * @param {Object} props.questionData - The question data including title, options, and images
 * @param {Function} props.onAnswerSelected - Function to call when an answer is selected
 * @param {boolean} props.isCorrect - Whether the current answer is correct (null if not yet answered)
 * @param {string} props.theme - The current theme ('light' or 'dark')
 * @param {string} props.containerClass - Additional CSS class for the container
 * @returns {React.ReactElement} The rendered Radio component
 */
const Radio = ({
  questionData,
  onAnswerSelected,
  isCorrect,
  theme,
  containerClass
}) => {
  // State to track which option is selected
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  /**
   * Handle when a user selects an option
   * @param {string} value - The selected option value
   * @param {number} index - The index of the selected option
   */
  const handleOptionSelect = (value, index) => {
    if (index !== undefined && index !== null) {
      onAnswerSelected([
        {
          answer: value,
          index: index + 1,
        },
      ]);
      setSelectedOptionIndex(index);
    }
  };

  return (
    <div className={`radio ${theme} ${containerClass}`}>
      <h3>{questionData.title}</h3>
      <div
        className={`content-question ${isCorrect === true ? 'no-select' : ''}`}
      >
        {questionData?.options?.map((option, index) => (
          <RadioOption
            key={index}
            option={option}
            pronunciation={questionData?.pronunciation?.[index] || ''}
            image={questionData?.images?.[index] || null}
            isSelected={!isEmpty(selectedOptionIndex) && selectedOptionIndex === index}
            isCorrect={isCorrect}
            onSelect={() => handleOptionSelect(option, index)}
          />
        ))}
      </div>
    </div>
  );
};

Radio.propTypes = {
  questionData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    pronunciation: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  containerClass: PropTypes.string
};

Radio.defaultProps = {
  isCorrect: null,
  containerClass: ''
};

export default Radio;
