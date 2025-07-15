import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Volume2 } from 'lucide-react';
import useCardWordHook from './useCardWordHook.jsx';
import audioService from '@/shared/services/audioService.js';
import './CardWord.scss';

const WordCard = ({ word, onClick, isSelected, draggableProps, onPlayAudio }) => (
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
    <button 
      className="word-card__audio-btn"
      onClick={(e) => {
        e.stopPropagation();
        onPlayAudio(word);
      }}
      title="Nghe phát âm"
    >
      <Volume2 size={16} />
    </button>
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
  } = useCardWordHook(onAnswerSelected);

  // Xử lý phát âm thanh cho từ vựng
  const handlePlayAudio = async (word) => {
    if (word.pronunciation) {
      await audioService.playJapaneseWord(word.pronunciation);
    } else if (word.text) {
      await audioService.playJapaneseWord(word.text);
    }
  };

  // Xử lý phát âm thanh cho hint
  const handlePlayHintAudio = async () => {
    if (type === 'card-word-english' && questionData.hintToken) {
      const hintText = questionData.hintToken.map(token => token.text).join(' ');
      await audioService.playJapaneseSentence(hintText);
    } else if (questionData.hintToken) {
      await audioService.playJapaneseSentence(questionData.hintToken);
    }
  };

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
        <button 
          className="card-word-question__play-btn" 
          onClick={handlePlayHintAudio}
          title="Nghe phát âm"
        >
          <Volume2 size={28} />
        </button>
        <Hint />
      </div>
      
      <div className="card-word-question__dropzone" onDragOver={handleDragOver}>
        {selectedWords.map((word, index) => (
          <WordCard 
            key={word.id} 
            word={word} 
            onClick={deselectWord}
            onPlayAudio={handlePlayAudio}
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
            onPlayAudio={handlePlayAudio}
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