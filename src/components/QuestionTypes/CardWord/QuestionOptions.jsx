import React from 'react';
import PropTypes from 'prop-types';

/**
 * QuestionOptions component renders the question options based on the card type
 * 
 * @param {Object} props - Component props
 * @param {string} props.type - Type of card word question (card-word-japan or card-word-english)
 * @param {Object} props.questionData - The question data
 * @returns {React.ReactElement} The rendered QuestionOptions component
 */
const QuestionOptions = ({ type, questionData }) => {
  const { hintToken } = questionData || {};

  if (type === 'card-word-english') {
    return (
      <>
        {hintToken?.map((option, index) => (
          <div className="options" key={index}>
            <ruby>
              {option?.text}
              <rp>(</rp>
              <rt>{option?.pronunciation}</rt>
              <rp>)</rp>
            </ruby>
          </div>
        ))}
      </>
    );
  }

  return <p className="hint-text">{hintToken}</p>;
};

QuestionOptions.propTypes = {
  type: PropTypes.oneOf(['card-word-english', 'card-word-japan']).isRequired,
  questionData: PropTypes.shape({
    hintToken: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          pronunciation: PropTypes.string
        })
      )
    ])
  }).isRequired
};

export default QuestionOptions;