import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FillInBlank.scss'; // Import the new SCSS file

export default function FillInBlank({
  listConfigQuestion,
  handleAnswer,
  isCorrectRedux,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  
  useEffect(() => {
    setSelectedOption(null);
  }, [listConfigQuestion]);
  
  const handleSelectOption = (option, index) => {
    if (isCorrectRedux !== null) return;
    
    setSelectedOption(index);
    handleAnswer([{
      answer: option,
      index: index + 1,
    }]);
  };
  
  const renderSentence = () => {
    const { sentence, blankIndex } = listConfigQuestion;
    if (!sentence || blankIndex === undefined) return null;
    
    return sentence.map((part, index) => {
      if (index === blankIndex) {
        return (
          <span key={index} className="fill-in-blank__blank-space">
            {selectedOption !== null ? listConfigQuestion.options[selectedOption] : ''}
          </span>
        );
      }
      return (
        <span key={index} className="fill-in-blank__sentence-part">
          {part}
        </span>
      );
    });
  };
  
  const getOptionClassName = (index) => {
    const isSelected = selectedOption === index;
    let className = "fill-in-blank__option";
    
    if (isSelected) {
      className += " selected";
      if (isCorrectRedux === true) {
        className += " success";
      } else if (isCorrectRedux === false) {
        className += " fail";
      }
    }
    
    return className;
  };
  
  return (
    <div className="fill-in-blank">
      <h3 className="fill-in-blank__title">{listConfigQuestion.title}</h3>
      
      <div className="fill-in-blank__sentence-container">
        {renderSentence()}
      </div>
      
      <div className="fill-in-blank__options-container">
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
  handleAnswer: PropTypes.func.isRequired,
  isCorrectRedux: PropTypes.bool,
};
