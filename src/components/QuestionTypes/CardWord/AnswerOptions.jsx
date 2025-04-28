import React from 'react';
import PropTypes from 'prop-types';

/**
 * AnswerOptions component renders the list of available answers to choose from
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of card word question (card-word-japan or card-word-english)
 * @param {Object} props.questionData - The question data
 * @param {Array} props.selectedAnswers - List of selected answers
 * @param {Function} props.onSelect - Function to call when an answer is selected
 * @returns {React.ReactElement} The rendered AnswerOptions component
 */
const AnswerOptions = ({
  type,
  questionData,
  selectedAnswers,
  onSelect
}) => {
  const renderAnswerItem = (item, index) => {
    const isSelected = selectedAnswers.some(answer => answer.index === index);
    
    return (
      <li
        className={`${isSelected ? 'selected' : ''}`}
        key={index}
        onClick={() => onSelect(item, index)}
      >
        {type === 'card-word-english' ? (
          item
        ) : (
          <ruby>
            {item.text}
            <rp>(</rp>
            <rt>{item.pronunciation}</rt>
            <rp>)</rp>
          </ruby>
        )}
      </li>
    );
  };

  return (
    <ul className="list-answer">
      {questionData?.options?.map(renderAnswerItem)}
    </ul>
  );
};

AnswerOptions.propTypes = {
  type: PropTypes.oneOf(['card-word-english', 'card-word-japan']).isRequired,
  questionData: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          text: PropTypes.string,
          pronunciation: PropTypes.string
        })
      ])
    ).isRequired
  }).isRequired,
  selectedAnswers: PropTypes.arrayOf(
    PropTypes.shape({
      answer: PropTypes.any,
      index: PropTypes.number
    })
  ),
  onSelect: PropTypes.func.isRequired
};

AnswerOptions.defaultProps = {
  selectedAnswers: []
};

export default AnswerOptions;