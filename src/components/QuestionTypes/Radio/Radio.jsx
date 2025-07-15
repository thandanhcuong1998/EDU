import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RadioOption from './RadioOption';
import { useAudio } from '@/shared/hooks/useAudio.js';
import './Radio.scss';

const Radio = ({
  questionData,
  onAnswerSelected,
  isCorrect,
}) => {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const { playWord } = useAudio();

  useEffect(() => {
    // Reset selection when the question changes
    setSelectedOptionIndex(null);
  }, [questionData]);

  const handleOptionSelect = (value, index) => {
    if (isCorrect !== null) return; // Prevent changing answer after checking

    setSelectedOptionIndex(index);
    onAnswerSelected([
      {
        answer: value,
        index: index + 1,
      },
    ]);

    // Play pronunciation if available
    if (questionData.pronunciation && questionData.pronunciation[index]) {
      playWord(questionData.pronunciation[index]);
    }
  };

  return (
    <div className="radio-question">
      <h3 className="radio-question__title">{questionData.title}</h3>
      <div
        className={`radio-question__options-container ${isCorrect !== null ? 'radio-question__options-container--no-select' : ''}`}
      >
        {questionData?.options?.map((option, index) => (
          <RadioOption
            key={index}
            option={option}
            pronunciation={questionData?.pronunciation?.[index] || ''}
            image={questionData?.images?.[index] || null}
            isSelected={selectedOptionIndex === index}
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
};

Radio.defaultProps = {
  isCorrect: null,
};

export default Radio;
