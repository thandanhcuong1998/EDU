import { createSlice } from '@reduxjs/toolkit';
import ListQuestionFakeDataLession from '../data/ListQuestionFakeDataLession.jsx';
import {
   checkRadioAnswer,
   checkCardWordAnswer,
} from '@/shared/lib/answerCheckers.js';
import { arraysEqual } from '@/shared/lib/util.jsx';
import audioService from '@/shared/services/audioService.js';
import srsService from '@/shared/services/srsService.js';
import xpService from '@/shared/services/xpService.js';

/**
 * Initial state for the lesson question choice reducer
 */
const initialState = {
   questions: ListQuestionFakeDataLession.N5.basicGreetings.level1,
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

         if (type === 'radio' || type === 'fill-in-blank') {
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

         // Play feedback sound
         audioService.playFeedbackSound(isCorrect);

         // Update SRS data
         if (currentQuestion && currentQuestion.id) {
            // Khởi tạo SRS item nếu chưa có
            let srsItem = srsService.getItemData(currentQuestion.id);
            if (!srsItem) {
               srsItem = srsService.initializeItem(
                  currentQuestion.id,
                  'question',
                  {
                     title: currentQuestion.title,
                     type: currentQuestion.type,
                     answer: currentQuestion.options ? currentQuestion.options[currentQuestion.correctAnswer] : 'Đáp án'
                  }
               );
            }

            // Đánh giá độ khó dựa trên kết quả
            const difficulty = isCorrect ? 4 : 1; // 4 = dễ, 1 = rất khó
            srsService.reviewItem(currentQuestion.id, difficulty);
         }

         // Update XP data
         const currentUser = JSON.parse(localStorage.getItem('currentUser'));
         if (currentUser && currentUser.id) {
            // Khởi tạo XP user nếu chưa có
            let xpUser = xpService.getUserData(currentUser.id);
            if (!xpUser) {
               xpUser = xpService.initializeUser(currentUser.id);
            }

            // Thêm XP dựa trên kết quả
            const action = isCorrect ? 'questionCorrect' : 'questionIncorrect';
            xpService.addXP(currentUser.id, action, {
               questionId: currentQuestion?.id,
               questionType: currentQuestion?.type,
               isCorrect
            });
         }
      },

      /**
       * Update current question index
       * @param {Object} state - Current state
       * @param {Object} action - Action with payload containing isIntroduction flag
       */
      updateQuestionIndex(state, action) {
         // Check if we're on an introduction screen
         const isIntroduction = action.payload?.isIntroduction || false;

         // If on introduction screen, always move to the first question
         if (isIntroduction) {
            state.currentQuestionIndex = 0;
            state.isCorrect = null;
            return;
         }

         // If progress is complete AND there are no failed questions, move to end
         if (state.progressBar >= 100 && state.listQuestionFail.length === 0) {
            state.currentQuestionIndex = state.questions.length + 1;
         } else if (
            state.progressBar >= 100 &&
            state.listQuestionFail.length > 0
         ) {
            // If progress is complete but there are failed questions, move to the first failed question
            state.currentQuestionIndex = state.listQuestionFail[0];
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
               console.warn('No more questions available, progress < 100%.');
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

      /**
       * Set lesson questions for a new lesson
       * @param {Object} state - Current state
       * @param {Object} action - Action with payload containing questions
       */
      setLessonQuestions(state, action) {
         // Validate that questions are provided
         if (!action.payload?.questions) {
            console.error("Action requires 'questions' in payload.");
            return state;
         }

         // Update only the questions and reset related state
         state.questions = action.payload.questions;
         state.currentQuestionIndex = 0;
         state.answers = [];
         state.isCorrect = null;
         state.progressBar = 0;
         state.listQuestionFail = [];
      },
   },
});

// Export action creators and reducer
export const { setAnswer, updateQuestionIndex, resetState, setLessonQuestions } =
   lessionQuestionChoiceSlice.actions;
export default lessionQuestionChoiceSlice.reducer;
