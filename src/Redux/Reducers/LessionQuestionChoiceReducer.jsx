import { createSlice } from '@reduxjs/toolkit';
import ListQuestionFakeDataLession from '../../Helpers/ListQuestionFakeDataLession.jsx';
import {
   checkRadioAnswer,
   checkCardWordAnswer,
} from '../../Helpers/answerCheckers.js';
import { arraysEqual } from '../../Helpers/util.jsx';

const initialState = {
   questions: ListQuestionFakeDataLession.N5.orderFood.level1,
   currentQuestionIndex: 0,
   answers: [],
   isCorrect: null,
   progressBar: 0,
   listQuestionFail: [],
};

const lessionQuestionChoiceSlice = createSlice({
   name: 'lessionQuestionChoice', // Tên của slice state (ví dụ: state.lessionQuestionChoice)
   initialState,
   reducers: {
      setAnswer(state, action) {
         // Nhận state (là một proxy Immer) và action
         const { index, answer, type } = action.payload;

         // --- Xử lý mapping-word ---
         if (type === 'mapping-word') {
            if (typeof index !== 'number') {
               console.error("Action 'mapping-word' thiếu 'index'.");
               return; // Không cần return state, Immer xử lý
            }
            // Với Immer, bạn có thể "mutate" state trực tiếp ở đây
            state.isCorrect = true;
            state.progressBar = Math.min(
               state.progressBar + 100 / state.questions.length,
               100
            );
            state.listQuestionFail = state.listQuestionFail.filter(
               failIndex => failIndex !== index
            );
            state.answers[index] = true; // Cập nhật trực tiếp
            return; // Kết thúc xử lý cho mapping-word
         }

         // --- Xử lý các type khác ---
         const currentQuestion = state.questions[index];
         if (!currentQuestion) {
            console.error(`Không tìm thấy câu hỏi tại index: ${index}`);
            return;
         }
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

         // Cập nhật state với Immer
         state.answers[index] = answer;
         state.isCorrect = isCorrect;
         state.progressBar = Math.min(
            isCorrect
               ? state.progressBar + 100 / state.questions.length
               : state.progressBar,
            100
         );

         if (isCorrect) {
            state.listQuestionFail = state.listQuestionFail.filter(
               failIndex => failIndex !== index
            );
         } else if (!state.listQuestionFail.includes(index)) {
            state.listQuestionFail.push(index); // Thêm trực tiếp với Immer
         }
      },
      updateQuestionIndex(state) {
         // Chỉ cần state vì không có payload
         if (state.progressBar >= 100) {
            state.currentQuestionIndex = state.questions.length + 1;
         } else {
            const nextQuestionIndexRegular = state.currentQuestionIndex + 1;
            if (nextQuestionIndexRegular < state.questions.length) {
               state.currentQuestionIndex = nextQuestionIndexRegular;
            } else if (state.listQuestionFail.length > 0) {
               state.currentQuestionIndex = state.listQuestionFail[0];
            } else {
               console.warn(
                  'Hết câu hỏi, không còn câu sai, progressBar < 100.'
               );
               state.currentQuestionIndex = state.questions.length + 1;
            }
         }
         // Reset isCorrect và answers khi chuyển câu (nếu cần)
         state.isCorrect = null;
         // state.answers = []; // Xem xét có nên reset answers không
      },
      // Có thể thêm các reducers khác ở đây
   },
});

// Export action creators và reducer
export const { setAnswer, updateQuestionIndex } =
   lessionQuestionChoiceSlice.actions;
export default lessionQuestionChoiceSlice.reducer;
