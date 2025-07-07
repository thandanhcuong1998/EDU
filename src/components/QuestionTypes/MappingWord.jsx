import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MappingWord.scss';

const FEEDBACK_DURATION_MS = 500;

const MappingCard = ({ text, pronunciation, onClick, className }) => (
  <div className={`mapping-card ${className}`} onClick={onClick}>
    <ruby>
      {text}
      {pronunciation && (
        <>
          <rp>(</rp>
          <rt>{pronunciation}</rt>
          <rp>)</rp>
        </>
      )}
    </ruby>
  </div>
);

export default function MappingWord({ listConfigQuestion, handleAnswer }) {
  const [activeOption1, setActiveOption1] = useState(null);
  const [optionsState, setOptionsState] = useState({
    options1: listConfigQuestion.options1.map(opt => ({ ...opt, isCorrect: false, isShaking: false })),
    options2: listConfigQuestion.options2.map(opt => ({ ...opt, isCorrect: false })),
  });

  const currentQuestionIndex = useSelector(state => state.LessionQuestionChoice.currentQuestionIndex);

  const handleSelectOption1 = (index) => {
    if (optionsState.options1[index].isCorrect) return;
    setActiveOption1(index);
  };

  const handleSelectOption2 = (index) => {
    if (activeOption1 === null || optionsState.options2[index].isCorrect) return;

    const correctIndexForOption2 = optionsState.options1[activeOption1]?.indexCorrect - 1;
    const isPairCorrect = correctIndexForOption2 === index;

    if (isPairCorrect) {
      setOptionsState(prev => ({
        options1: prev.options1.map((opt, i) => i === activeOption1 ? { ...opt, isCorrect: true } : opt),
        options2: prev.options2.map((opt, i) => i === index ? { ...opt, isCorrect: true } : opt),
      }));
    } else {
      setOptionsState(prev => ({
        ...prev,
        options1: prev.options1.map((opt, i) => i === activeOption1 ? { ...opt, isShaking: true } : opt),
      }));
      setTimeout(() => {
        setOptionsState(prev => ({
          ...prev,
          options1: prev.options1.map((opt, i) => i === activeOption1 ? { ...opt, isShaking: false } : opt),
        }));
      }, FEEDBACK_DURATION_MS);
    }
    setActiveOption1(null);
  };

  useEffect(() => {
    const allCorrect = optionsState.options1.every(opt => opt.isCorrect);
    if (allCorrect) {
      handleAnswer([{ answer: 'completed', index: currentQuestionIndex }]);
    }
  }, [optionsState, handleAnswer, currentQuestionIndex]);
  
  useEffect(() => {
    // Reset state when question changes
    setOptionsState({
      options1: listConfigQuestion.options1.map(opt => ({ ...opt, isCorrect: false, isShaking: false })),
      options2: listConfigQuestion.options2.map(opt => ({ ...opt, isCorrect: false })),
    });
    setActiveOption1(null);
  }, [listConfigQuestion]);

  return (
    <div className="mapping-question">
      <h3 className="mapping-question__title">{listConfigQuestion.title}</h3>
      <div className="mapping-question__container">
        <div className="mapping-question__column">
          {optionsState.options1.map((item, index) => (
            <MappingCard
              key={`opt1-${index}`}
              text={item.text}
              pronunciation={item.pronunciation}
              onClick={() => handleSelectOption1(index)}
              className={`
                ${activeOption1 === index ? 'mapping-card--selected' : ''}
                ${item.isCorrect ? 'mapping-card--correct' : ''}
                ${item.isShaking ? 'mapping-card--shake' : ''}
              `}
            />
          ))}
        </div>
        <div className="mapping-question__column">
          {optionsState.options2.map((item, index) => (
            <MappingCard
              key={`opt2-${index}`}
              text={item.text}
              onClick={() => handleSelectOption2(index)}
              className={`
                ${optionsState.options2[index].isCorrect ? 'mapping-card--correct' : ''}
                ${activeOption1 === null ? 'mapping-card--disabled' : ''}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
