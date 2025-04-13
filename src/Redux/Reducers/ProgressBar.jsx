import { ProgressBarAction } from '../Actions/ProgressBarAction.jsx';
import { ListQuestionsSet } from '../../Helpers/ListQuestionSetWelcome.jsx';

const initialState = Object.keys(ListQuestionsSet).length;

const ProgressBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ProgressBarAction.SET_PROGRESS_BAR:
      return action.payload;
    case ProgressBarAction.UPDATE_PROGRESS_BAR:
      return (state += action.payload);
    default:
      return state;
  }
};

export default ProgressBarReducer;
