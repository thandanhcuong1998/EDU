import { createSlice } from '@reduxjs/toolkit';
import ListQuestionFakeDataLession from '../../Helpers/ListQuestionFakeDataLession.jsx';
import {
   checkRadioAnswer,
   checkCardWordAnswer,
} from '../../Helpers/answerCheckers.js';
import { arraysEqual } from '../../Helpers/util.jsx';

/**
 * Initial state for the lesson question choice reducer
 */
const initialState = {
   questions: ListQuestionFakeDataLession.N5.orderFood.level1,
   currentQuestionIndex: 0,
   answers: [],
   isCorrect: null,
   progressBar: 0,
   listQuestionFail: [],
};

/**
 * Helper function to update progress bar
 * @param {Object} state - Current state
 * @param {boolean} isCorrect - Whether the answer is correct
 */
const updateProgressBar = (state, isCorrect) => {
   if (isCorrect) {
      state.progressBar = Math.min(
         state.progressBar + 100 / state.questions.length,
         100
      );
   }
};

/**
 * Helper function to update failed questions list
 * @param {Object} state - Current state
 * @param {number} index - Question index
 * @param {boolean} isCorrect - Whether the answer is correct
 */
const updateFailedQuestions = (state, index, isCorrect) => {
   if (isCorrect) {
      state.listQuestionFail = state.listQuestionFail.filter(
         failIndex => failIndex !== index
      );
   } else if (!state.listQuestionFail.includes(index)) {
      state.listQuestionFail.push(index);
   }
};

/**
 * Lesson question choice slice
 */
const lessionQuestionChoiceSlice = createSlice({
   name: 'lessionQuestionChoice',
   initialState,
   reducers: {
      /**
       * Set answer for a question
       * @param {Object} state - Current state
       * @param {Object} action - Action with payload containing index, answer, and type
       */
      setAnswer(state, action) {
         const { index, answer, type } = action.payload;

         // Validate index is a number
         if (typeof index !== 'number') {
            console.error("Action requires a numeric 'index'.");
            return;
         }

         // Handle mapping-word type questions
         if (type === 'mapping-word') {
            state.isCorrect = true;
            state.answers[index] = true;
            updateProgressBar(state, true);
            updateFailedQuestions(state, index, true);
            return;
         }

         // Handle other question types
         const currentQuestion = state.questions[index];
         if (!currentQuestion) {
            console.error(`Question not found at index: ${index}`);
            return;
         }

         // Check if answer is correct based on question type
         const correctAnswersData = currentQuestion.correctAnswer;
         let isCorrect = false;

         if (type === 'radio') {
            isCorrect = checkRadioAnswer(correctAnswersData, answer);
         } else if (
            type === 'card-word-english' ||
            type === 'card-word-japan'
         ) {
            isCorrect = checkCardWordAnswer(
               correctAnswersData,
               answer,
               arraysEqual
            );
         }

         // Update state
         state.answers[index] = answer;
         state.isCorrect = isCorrect;
         updateProgressBar(state, isCorrect);
         updateFailedQuestions(state, index, isCorrect);
      },

      /**
       * Update current question index
       * @param {Object} state - Current state
       */
      updateQuestionIndex(state) {
         // If progress is complete, move to end
         if (state.progressBar >= 100) {
            state.currentQuestionIndex = state.questions.length + 1;
         } else {
            const nextIndex = state.currentQuestionIndex + 1;

            if (nextIndex < state.questions.length) {
               // Move to next question if available
               state.currentQuestionIndex = nextIndex;
            } else if (state.listQuestionFail.length > 0) {
               // Move to first failed question if no more regular questions
               state.currentQuestionIndex = state.listQuestionFail[0];
            } else {
               // No more questions and no failed questions
               console.warn(
                  'No more questions available, progress < 100%.'
               );
               state.currentQuestionIndex = state.questions.length + 1;
            }
         }

         // Reset correct status for new question
         state.isCorrect = null;
      },

      /**
       * Reset state for a new lesson
       * @param {Object} state - Current state
       * @param {Object} action - Action with payload containing questions
       */
      resetState(state, action) {
         return {
            ...initialState,
            questions: action.payload?.questions || initialState.questions,
            // Preserve any other state properties if needed
         };
      },
   },
});

// Export action creators and reducer
export const { setAnswer, updateQuestionIndex, resetState } =
   lessionQuestionChoiceSlice.actions;
export default lessionQuestionChoiceSlice.reducer;
