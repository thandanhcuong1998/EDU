/**
 * Service for handling answer-related logic
 */

/**
 * Process a new answer and add it to the list if it doesn't exist
 * @param {Array} listAnswer - Current list of answers
 * @param {*} newAnswer - New answer to add
 * @param {number} index - Index of the answer
 * @returns {Array} - Updated list of answers
 */
export const processAnswer = (listAnswer, newAnswer, index) => {
  // Check if an answer with this index already exists
  if (!listAnswer.some(element => element.index === index)) {
    return [...listAnswer, { answer: newAnswer, index: index }];
  }
  return listAnswer;
};

/**
 * Remove an answer from the list by index
 * @param {Array} listAnswer - Current list of answers
 * @param {number} index - Index of the answer to remove
 * @returns {Array} - Updated list of answers
 */
export const removeAnswer = (listAnswer, index) => {
  return listAnswer.filter(element => element.index !== index);
};

/**
 * Reorder answers in the list (for drag and drop functionality)
 * @param {Array} listAnswer - Current list of answers
 * @param {number} draggedIndex - Index of the dragged item
 * @param {number} dropIndex - Index where the item was dropped
 * @returns {Array} - Updated list of answers
 */
export const reorderAnswers = (listAnswer, draggedIndex, dropIndex) => {
  if (draggedIndex !== null && draggedIndex !== dropIndex) {
    const newItems = [...listAnswer];
    const draggedItem = newItems[draggedIndex];
    
    // Swap positions
    newItems[draggedIndex] = newItems[dropIndex];
    newItems[dropIndex] = draggedItem;
    
    return newItems;
  }
  return listAnswer;
};

// Export as a service object for easier imports and mocking in tests
const answerService = {
  processAnswer,
  removeAnswer,
  reorderAnswers
};

export default answerService;