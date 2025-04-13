import { LessionQuestionChoiceAction } from '../Actions/LessionQuestionChoiceAction.jsx';
import ListQuestionFakeDataLession from '../../Helpers/ListQuestionFakeDataLession.jsx';
import { arraysEqual } from '../../Helpers/util.jsx';

const initialState = {
  questions: ListQuestionFakeDataLession.N5.orderFood.level1, // Lưu trữ danh sách câu hỏi
  currentQuestionIndex: 0,
  answers: [],
  isCorrect: null,
  progressBar: 0,
  listQuestionFail: [],
};

const LessionQuestionChoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LessionQuestionChoiceAction.SET_ANSWER: {
      const { index, answer, type } = action.payload;

      if (action.payload.type === 'mapping-word') {
        return {
          ...state,
          isCorrect: true,
          progressBar:
            state.isCorrect === true
              ? state.progressBar + 100 / state.questions.length
              : state.progressBar,
        };
      }

      // lấy kết quả câu hi theo index
      const correctAnswers = state.questions[index].correctAnswer;

      // Tạo một bản sao của mảng answers
      const newAnswers = [...state.answers];
      newAnswers[index] = answer; // Cập nhật câu trả lời

      // Kiểm tra câu trả lời đúng sai
      let isCorrect = false;
      if (type === 'radio') {
        isCorrect = correctAnswers === answer[0].index;
      } else if (type === 'card-word-english' || type === 'card-word-japan') {
        const newArray = answer.map(item => item.index + 1);
        isCorrect = arraysEqual(newArray, correctAnswers);
      }

      // Trả về state mới
      return {
        ...state,
        answers: newAnswers,
        isCorrect,
        progressBar:
          isCorrect === true
            ? state.progressBar + 100 / state.questions.length
            : state.progressBar,
        listQuestionFail:
          isCorrect === false
            ? [...state.listQuestionFail, index]
            : state.listQuestionFail,
      };
    }

    case LessionQuestionChoiceAction.UPDATE_QUESTION_INDEX:
      const questionIndex = state.currentQuestionIndex + 1;

      return {
        ...state,
        currentQuestionIndex:
          questionIndex === state.questions.length // nếu list question đã chạy hết 1 lần
            ? state.listQuestionFail[0] // di chuyển tới list question fail để user trả lời lại
            : state.progressBar === 100 // nếu như trả lời hết và đúng
              ? state.questions.length + 1 // tăng độ dài listquestion + 1 để kết thúc list câu hỏi
              : questionIndex, // nếu chưa trả lờidddusng 100% sẽ chạy question index còn thiếu
        isCorrect: null,
        answers: [],
      };
    default:
      return state;
  }
};

export default LessionQuestionChoiceReducer;
