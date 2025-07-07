import { useState, useEffect, useCallback } from 'react';

const useCardWordHook = (onAnswerSelected) => {
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const initializeWords = useCallback((options) => {
    const initialWords = options.map((option, index) => ({
      id: index,
      text: typeof option === 'object' ? option.text : option,
      pronunciation: typeof option === 'object' ? option.pronunciation : null,
    }));
    setAvailableWords(initialWords);
    setSelectedWords([]);
  }, []);

  const selectWord = (word) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
  };

  const deselectWord = (word) => {
    setAvailableWords(prev => [...prev, word].sort((a, b) => a.id - b.id));
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
  };

  // Drag and Drop Handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex) => {
    if (draggedIndex === null) return;

    const newSelectedWords = [...selectedWords];
    const [draggedItem] = newSelectedWords.splice(draggedIndex, 1);
    newSelectedWords.splice(targetIndex, 0, draggedItem);

    setSelectedWords(newSelectedWords);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  useEffect(() => {
    if (onAnswerSelected) {
      onAnswerSelected(selectedWords.map(word => ({
        answer: word.text,
        index: word.id + 1,
      })));
    }
  }, [selectedWords, onAnswerSelected]);

  const handleOnClickPlayAudio = (questionData) => {
    if (questionData.hintToken && Array.isArray(questionData.hintToken)) {
      const textToSpeak = questionData.hintToken.map(token => token.text).join(' ');
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ja-JP';
      speechSynthesis.speak(utterance);
    }
  };

  return {
    selectedWords,
    availableWords,
    draggedIndex,
    initializeWords,
    selectWord,
    deselectWord,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleOnClickPlayAudio,
  };
};

export default useCardWordHook;
