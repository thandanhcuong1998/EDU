import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Radio from './QuestionTypes/Radio';
import CardWord from './QuestionTypes/CardWord';
import MappingWord from './QuestionTypes/MappingWord';
import FillInBlank from './QuestionTypes/FillInBlank/FillInBlank';
import { Complete } from '../../../../Routes/MainAppStudy/Learn/components/Complete.jsx';

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
   const currentQuestion = questions[currentQuestionIndex];

   const handleAnswerQuestion = answer => {
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
                           classRoot={'radio'}
                           listConfigQuestion={currentQuestion}
                           handleAnswer={handleAnswerQuestion}
                           isCorrectRedux={isCorrectRedux}
                        />
                     );
                  case 'card-word-english':
                  case 'card-word-japan':
                     return (
                        <CardWord
                           classRoot={currentQuestion.type}
                           listConfigQuestion={currentQuestion}
                           handleAnswer={handleAnswerQuestion}
                           type={currentQuestion.type}
                           isCorrectRedux={isCorrectRedux}
                        />
                     );
                  case 'mapping-word':
                     return (
                        <MappingWord
                           classRoot={'mapping-word'}
                           listConfigQuestion={currentQuestion}
                           handleAnswer={handleAnswerQuestion}
                           isCorrectRedux={isCorrectRedux}
                        />
                     );
                  case 'fill-in-blank':
                     return (
                        <FillInBlank
                           classRoot={'fill-in-blank'}
                           listConfigQuestion={currentQuestion}
                           handleAnswer={handleAnswerQuestion}
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