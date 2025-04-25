import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../../../../../Helpers/util.jsx';

/**
 * Fill in the blank question component
 * Users select the correct word to complete a sentence
 * 
 * @param {Object} props - Component props
 * @param {Object} props.listConfigQuestion - Question configuration
 * @param {string} props.classRoot - CSS class for the root element
 * @param {Function} props.handleAnswer - Function to handle answer selection
 * @param {boolean|null} props.isCorrectRedux - Whether the answer is correct (from Redux)
 * @returns {JSX.Element} - Rendered component
 */
export default function FillInBlank({
  listConfigQuestion,
  classRoot,
  handleAnswer,
  isCorrectRedux,
}) {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Reset selected option when question changes
  useEffect(() => {
    setSelectedOption(null);
  }, [listConfigQuestion]);
  
  // Handle option selection
  const handleSelectOption = (option, index) => {
    if (isCorrectRedux !== null) return; // Prevent selection after answer is checked
    
    setSelectedOption(index);
    handleAnswer([{
      answer: option,
      index: index + 1,
    }]);
  };
  
  // Generate the sentence with blank
  const renderSentence = () => {
    const { sentence, blankIndex } = listConfigQuestion;
    if (!sentence || blankIndex === undefined) return null;
    
    return sentence.map((part, index) => {
      if (index === blankIndex) {
        return (
          <span key={index} className="blank-space">
            {selectedOption !== null ? listConfigQuestion.options[selectedOption] : '____'}
          </span>
        );
      }
      return (
        <span key={index} className="sentence-part">
          {part}
        </span>
      );
    });
  };
  
  // Generate class names for options
  const getOptionClassName = (index) => {
    const isSelected = selectedOption === index;
    let className = "fill-blank-option";
    
    if (isSelected) {
      className += " selected";
      
      if (isCorrectRedux === true) {
        className += " success";
      } else if (isCorrectRedux === false) {
        className += " isFail";
      }
    }
    
    return className;
  };
  
  return (
    <div className={`${classRoot} d-flex justify-content-start flex-column align-items-start`}>
      <h3 className="text-white">{listConfigQuestion.title}</h3>
      
      <div className="sentence-container my-4">
        {renderSentence()}
      </div>
      
      <div className="options-container d-flex flex-wrap justify-content-center">
        {listConfigQuestion.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClassName(index)}
            onClick={() => handleSelectOption(option, index)}
          >
            <ruby>
              {option}
              {listConfigQuestion.pronunciation && (
                <>
                  <rp>(</rp>
                  <rt>{listConfigQuestion.pronunciation[index]}</rt>
                  <rp>)</rp>
                </>
              )}
            </ruby>
          </div>
        ))}
      </div>
      
      {isCorrectRedux === false && (
        <div className="feedback-message error-message mt-3">
          Try again! The correct answer is: {listConfigQuestion.options[listConfigQuestion.correctAnswer - 1]}
        </div>
      )}
      
      {isCorrectRedux === true && (
        <div className="feedback-message success-message mt-3">
          Correct! Well done!
        </div>
      )}
    </div>
  );
}

FillInBlank.propTypes = {
  listConfigQuestion: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sentence: PropTypes.arrayOf(PropTypes.string).isRequired,
    blankIndex: PropTypes.number.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    pronunciation: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.number.isRequired,
  }).isRequired,
  classRoot: PropTypes.string.isRequired,
  handleAnswer: PropTypes.func.isRequired,
  isCorrectRedux: PropTypes.bool,
};