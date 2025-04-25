import { useEffect, useState } from 'react';
import audioService from '../services/audioService';
import answerService from '../services/answerService';

/**
 * Custom hook for handling card word question interactions
 * @param {Function} handleAnswer - Callback function to handle answer updates
 * @param {string} type - Type of card word question (card-word-japan or card-word-english)
 * @returns {Object} - Hook interface with methods and state
 */
const useCardWordHook = (handleAnswer, type) => {
   const [listAnswer, setListAnswer] = useState([]);
   const [isDragging, setIsDragging] = useState(false);
   const [draggedItemIndex, setDraggedItemIndex] = useState(null);

   // Cleanup effect when type changes
   useEffect(() => {
      return () => {
         setListAnswer([]);
      };
   }, [type]);

   // Update parent component when answers change
   useEffect(() => {
      // Only call handleAnswer when listAnswer changes, not when handleAnswer changes
      if (listAnswer.length > 0) {
         handleAnswer(listAnswer);
      }
   }, [listAnswer]);

   /**
    * Handle adding a new answer
    */
   const onHandleAnswer = async (value, index) => {
      // Play audio for Japanese words
      if (type === 'card-word-japan' && value?.text) {
         const result = await audioService.playAudio(value.text);
         if (!result.success) {
            console.error('Failed to play audio:', result.error);
            // Could implement a toast notification here
         }
      }

      // Update answer list
      setListAnswer(prev => answerService.processAnswer(prev, value, index));
   };

   /**
    * Handle removing an answer
    */
   const removeAnswer = index => {
      if (!isDragging) {
         setListAnswer(prev => answerService.removeAnswer(prev, index));
      }
   };

   /**
    * Handle drag start event
    */
   const handleDragStart = index => {
      setDraggedItemIndex(index);
      setIsDragging(true);
   };

   /**
    * Handle drop event
    */
   const handleDrop = index => {
      setListAnswer(prev => answerService.reorderAnswers(prev, draggedItemIndex, index));
      setIsDragging(false);
      setDraggedItemIndex(null);
   };

   /**
    * Handle drag end event
    */
   const handleDragEnd = () => {
      setIsDragging(false);
      setDraggedItemIndex(null);
   };

   /**
    * Handle drag over event
    */
   const handleDragOver = e => {
      e.preventDefault(); // Prevent default to allow drop
   };

   /**
    * Handle playing audio for a question
    */
   const handleOnClickPlayAudio = async (question) => {
      const result = await audioService.playWordAudio(question);
      if (!result.success) {
         console.error('Failed to play word audio:', result.error);
         // Could implement a toast notification here
      }
   };

   return {
      listAnswer,
      onHandleAnswer,
      removeAnswer,
      handleDragStart,
      handleDrop,
      handleDragEnd,
      handleDragOver,
      handleOnClickPlayAudio,
   };
};

export default useCardWordHook;
