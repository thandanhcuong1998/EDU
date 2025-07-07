import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Radio from '@/components/QuestionTypes/Radio/Radio.jsx';
import CardWord from '@/components/QuestionTypes/CardWord/CardWord.jsx';
import MappingWord from '@/components/QuestionTypes/MappingWord.jsx';
import FillInBlank from '@/components/QuestionTypes/FillInBlank/FillInBlank.jsx';
import { Complete } from '../Complete.jsx';

/**
 * Question component that renders different question types based on the current question
 * 
 * @param {Object} props - Component props
 * @param {Array} props.questions - Array of question objects
 * @param {Function} props.setAnswerState - Function to set the answer state
 * @param {boolean|null} props.isCorrectRedux - Whether the answer is correct (from Redux)
 * @returns {JSX.Element} - Rendered component
 */
const Question = ({ questions, setAnswerState, isCorrectRedux }) => {
   const currentQuestionIndex = useSelector(
      state => state.LessionQuestionChoice.currentQuestionIndex
   );
   const { theme } = useSelector(state => state.theme);
   const currentQuestion = questions[currentQuestionIndex];

   const handleAnswerSelected = answer => {
      setAnswerState({
         index: currentQuestionIndex,
         answer,
         type: currentQuestion.type,
      });
   };

   return (
      <>
         {currentQuestion ? (
            (() => {
               switch (currentQuestion.type) {
                  case 'radio':
                     return (
                        <Radio
                           questionData={currentQuestion}
                           onAnswerSelected={handleAnswerSelected}
                           isCorrect={isCorrectRedux}
                           theme={theme}
                        />
                     );
                  case 'card-word-english':
                  case 'card-word-japan':
                     return (
                        <CardWord
                           questionData={currentQuestion}
                           onAnswerSelected={handleAnswerSelected}
                           type={currentQuestion.type}
                           isCorrect={isCorrectRedux}
                           theme={theme}
                        />
                     );
                  case 'mapping-word':
                     return (
                        <MappingWord
                           listConfigQuestion={currentQuestion}
                           handleAnswer={handleAnswerSelected}
                           isCorrectRedux={isCorrectRedux}
                           theme={theme}
                        />
                     );
                  case 'fill-in-blank':
                     return (
                        <FillInBlank
                           listConfigQuestion={currentQuestion}
                           handleAnswer={handleAnswerSelected}
                           isCorrectRedux={isCorrectRedux}
                        />
                     );
                  default:
                     return null;
               }
            })()
         ) : (
            <Complete />
         )}
      </>
   );
};

Question.propTypes = {
   questions: PropTypes.array.isRequired,
   setAnswerState: PropTypes.func.isRequired,
   isCorrectRedux: PropTypes.bool,
};

export default Question;