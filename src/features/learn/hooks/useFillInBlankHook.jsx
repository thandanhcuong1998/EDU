import { useState, useEffect } from 'react';
import audioService from '../../../services/audioService';

/**
 * Custom hook for handling fill-in-blank question interactions
 * 
 * @param {Function} handleAnswer - Callback function to handle answer updates
 * @returns {Object} - Hook interface with methods and state
 */
const useFillInBlankHook = (handleAnswer) => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Reset selected option when component unmounts
  useEffect(() => {
    return () => {
      setSelectedOption(null);
    };
  }, []);
  
  // Update parent component when selected option changes
  useEffect(() => {
    if (selectedOption !== null) {
      handleAnswer([{
        answer: selectedOption.text,
        index: selectedOption.index + 1,
      }]);
    }
  }, [selectedOption, handleAnswer]);
  
  /**
   * Handle selecting an option
   * @param {string} text - The text of the selected option
   * @param {number} index - The index of the selected option
   */
  const handleSelectOption = (text, index) => {
    setSelectedOption({ text, index });
    
    // Play audio if available
    if (text) {
      playOptionAudio(text);
    }
  };
  
  /**
   * Play audio for the selected option
   * @param {string} text - The text to play audio for
   */
  const playOptionAudio = async (text) => {
    const result = await audioService.playAudio(text);
    if (!result.success) {
      console.error('Failed to play audio:', result.error);
      // Could implement a toast notification here
    }
  };
  
  /**
   * Play audio for the entire sentence
   * @param {Object} question - The question object
   */
  const playSentenceAudio = async (question) => {
    if (!question || !question.sentence) return;
    
    // Join all parts of the sentence
    const fullSentence = question.sentence.join('');
    
    const result = await audioService.playAudio(fullSentence);
    if (!result.success) {
      console.error('Failed to play sentence audio:', result.error);
      // Could implement a toast notification here
    }
  };
  
  /**
   * Reset the selected option
   */
  const resetSelection = () => {
    setSelectedOption(null);
  };
  
  return {
    selectedOption,
    handleSelectOption,
    playOptionAudio,
    playSentenceAudio,
    resetSelection,
  };
};

export default useFillInBlankHook;