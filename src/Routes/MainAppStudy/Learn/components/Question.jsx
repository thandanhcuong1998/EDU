import React from 'react';
import Radio from './componentsTypeQuestion/Radio.jsx';
import CardWord from './componentsTypeQuestion/CardWord.jsx';
import MappingWord from './componentsTypeQuestion/MappingWord.jsx';
import { useSelector } from 'react-redux';
import { Complete } from './Complete.jsx';

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
            default:
              return null; // Trả về null nếu không có trường hợp nào khớp
          }
        })()
      ) : (
        <Complete />
      )}
    </>
  );
};
export default Question;
