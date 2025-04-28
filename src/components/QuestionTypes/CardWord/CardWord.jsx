import React from 'react';
import PropTypes from 'prop-types';
import { Volume2 } from 'lucide-react';
import useCardWordHook from '../../../Hooks/useCardWordHook.jsx';
import QuestionOptions from './QuestionOptions';
import SelectedAnswers from './SelectedAnswers';
import AnswerOptions from './AnswerOptions';
import './CardWord.scss';

/**
 * CardWord component renders a card-based word matching question
 * 
 * @param {Object} props - Component props
 * @param {Object} props.questionData - The question data
 * @param {Function} props.onAnswerSelected - Function to call when answers are selected
 * @param {string} props.type - Type of card word question (card-word-japan or card-word-english)
 * @param {boolean} props.isCorrect - Whether the current answer is correct (null if not yet answered)
 * @param {string} props.theme - The current theme ('light' or 'dark')
 * @param {string} props.containerClass - Additional CSS class for the container
 * @returns {React.ReactElement} The rendered CardWord component
 */
const CardWord = ({
  questionData,
  onAnswerSelected,
  type,
  isCorrect,
  theme,
  containerClass
}) => {
  const {
    listAnswer,
    onHandleAnswer,
    removeAnswer,
    handleDragStart,
    handleDrop,
    handleDragEnd,
    handleDragOver,
    handleOnClickPlayAudio,
  } = useCardWordHook(onAnswerSelected, type);

  return (
    <div className={`card-word ${type} ${theme} ${containerClass}`}>
      <h3>{questionData.title}</h3>
      <div className="content-question">
        {type === 'card-word-english' && (
          <div className="radioPlay">
            <button onClick={() => handleOnClickPlayAudio(questionData)}>
              <Volume2 />
            </button>
          </div>
        )}
        <QuestionOptions 
          type={type} 
          questionData={questionData} 
        />
      </div>
      
      <div className="answer-choice">
        <SelectedAnswers
          type={type}
          answers={listAnswer}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragEnd={handleDragEnd}
          onRemove={removeAnswer}
        />
      </div>

      <div className="content-answer">
        <AnswerOptions
          type={type}
          questionData={questionData}
          selectedAnswers={listAnswer}
          onSelect={onHandleAnswer}
        />
      </div>
    </div>
  );
};

CardWord.propTypes = {
  questionData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    hintToken: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ])
  }).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['card-word-english', 'card-word-japan']).isRequired,
  isCorrect: PropTypes.bool,
  theme: PropTypes.oneOf(['light', 'dark']).isRequired,
  containerClass: PropTypes.string
};

CardWord.defaultProps = {
  isCorrect: null,
  containerClass: ''
};

export default CardWord;