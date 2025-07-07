import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Volume2 } from 'lucide-react';
import useCardWordHook from './useCardWordHook.jsx';
import './CardWord.scss';

const WordCard = ({ word, onClick, isSelected, draggableProps }) => (
  <div
    className={`word-card ${isSelected ? 'word-card--selected' : ''}`}
    onClick={() => !isSelected && onClick(word)}
    {...draggableProps}
  >
    <ruby>
      {word.text}
      {word.pronunciation && (
        <>
          <rp>(</rp>
          <rt>{word.pronunciation}</rt>
          <rp>)</rp>
        </>
      )}
    </ruby>
  </div>
);

const CardWord = ({
  questionData,
  onAnswerSelected,
  type,
}) => {
  const {
    selectedWords,
    availableWords,
    initializeWords,
    selectWord,
    deselectWord,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleOnClickPlayAudio,
  } = useCardWordHook(onAnswerSelected);

  useEffect(() => {
    if (questionData.options) {
      initializeWords(questionData.options);
    }
  }, [questionData, initializeWords]);

  const Hint = () => {
    if (type === 'card-word-english') {
      return (
        <div className="card-word-question__hint-text">
          {questionData.hintToken.map((token, index) => (
            <ruby key={index}>
              {token.text}
              <rp>(</rp>
              <rt>{token.pronunciation}</rt>
              <rp>)</rp>
            </ruby>
          ))}
        </div>
      );
    }
    return <div className="card-word-question__hint-text">{questionData.hintToken}</div>;
  };

  return (
    <div className="card-word-question">
      <h3 className="card-word-question__title">{questionData.title}</h3>
      
      <div className="card-word-question__hint-container">
        {type === 'card-word-english' && (
          <button className="card-word-question__play-btn" onClick={() => handleOnClickPlayAudio(questionData)}>
            <Volume2 size={28} />
          </button>
        )}
        <Hint />
      </div>
      
      <div className="card-word-question__dropzone" onDragOver={handleDragOver}>
        {selectedWords.map((word, index) => (
          <WordCard 
            key={word.id} 
            word={word} 
            onClick={deselectWord}
            draggableProps={{
              draggable: true,
              onDragStart: () => handleDragStart(index),
              onDrop: () => handleDrop(index),
              onDragEnd: handleDragEnd,
            }}
          />
        ))}
      </div>

      <div className="card-word-question__word-bank">
        {availableWords.map(word => (
          <WordCard 
            key={word.id} 
            word={word} 
            onClick={selectWord} 
            isSelected={false}
          />
        ))}
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
    ]).isRequired,
  }).isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['card-word-english', 'card-word-japan']).isRequired,
};

export default CardWord;