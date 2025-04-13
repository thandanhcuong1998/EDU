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

/**
 * Reducer quản lý trạng thái cho các câu hỏi lựa chọn trong bài học.
 *
 * @param {object} state Trạng thái hiện tại của reducer.
 * @param {object} action Action được dispatch tới reducer.
 * @returns {object} Trạng thái mới sau khi xử lý action.
 */
const LessionQuestionChoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LessionQuestionChoiceAction.SET_ANSWER: {
      const { index, answer, type } = action.payload;

      if (action.payload.type === 'mapping-word') {
        return {
          // Xử lý trường hợp câu hỏi dạng "nối từ" (mapping-word).
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

      // Kiểm tra tính đúng đắn của câu trả lời dựa trên loại câu hỏi.
      let isCorrect = false;
      if (type === 'radio') {
        // Câu hỏi radio: So sánh đáp án đúng với index của lựa chọn được chọn.
        isCorrect = correctAnswers === answer[0].index;
      } else if (type === 'card-word-english' || type === 'card-word-japan') {
        // Câu hỏi dạng thẻ từ (card-word): So sánh mảng index của các thẻ được chọn với đáp án đúng.
        const newArray = answer.map(item => item.index + 1);

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
      // Xử lý việc cập nhật index của câu hỏi hiện tại.
      const questionIndex = state.currentQuestionIndex + 1;

      return {
        // Cập nhật index câu hỏi hiện tại, xét các trường hợp:
        ...state,
        currentQuestionIndex:
          questionIndex === state.questions.length // Nếu đã trả lời hết các câu hỏi
            ? state.listQuestionFail[0] // Chuyển đến câu hỏi đầu tiên trong danh sách câu hỏi sai (nếu có) để người dùng trả lời lại.
            : state.progressBar === 100 // Nếu đã trả lời đúng 100% số câu hỏi
              ? state.questions.length + 1 // Tăng index câu hỏi lên để đánh dấu kết thúc bài học.
              : questionIndex, // Nếu chưa trả lời đúng hết, chuyển sang câu hỏi tiếp theo.
        isCorrect: null,
        answers: [],
      };
    default:
      return state;
  }
};

export default LessionQuestionChoiceReducer;
