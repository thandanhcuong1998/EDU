import { QuestionSetWelcomeAction } from '../Actions/QuestionSetWelcomeAction.jsx';

const initialState = [];

const QuestionSetWelcomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case QuestionSetWelcomeAction.SET_QUESTION_CHOICE:
      const updatedQuestions = state.map(item => {
        if (item.id === action.payload.IDQuestionSet) {
          // Nếu tìm thấy, cập nhật questionChoice
          return {
            ...item,
            questionChoice: action.payload.questionChoice,
          };
        }
        return item; // Giữ nguyên các đối tượng không thay đổi
      });

      // Nếu không tìm thấy, thêm đối tượng mới vào cuối mảng
      if (!state.some(item => item.id === action.payload.IDQuestionSet)) {
        return [
          ...updatedQuestions,
          {
            id: action.payload.IDQuestionSet,
            questionChoice: action.payload.questionChoice,
          },
        ];
      }

      return updatedQuestions; // Trả về mảng đã cập nhật
    case QuestionSetWelcomeAction.UPDATE_QUESTION_CHOICE:
      return state.filter(item => item.id !== action.payload.IDQuestionSet);
    case QuestionSetWelcomeAction.DELETE_QUESTION_CHOICE:
      return [];
    default:
      return state;
  }
};

export default QuestionSetWelcomeReducer;
