import { combineReducers } from 'redux';
import QuestionSetWelcomeReducer from './QuestionSetWelcome.jsx';
import ProgressBarReducer from './ProgressBar.jsx';
import LessionQuestionChoiceReducer from './LessionQuestionChoiceReducer.jsx';

const rootReducer = combineReducers({
    questionChoiceWelcome: QuestionSetWelcomeReducer,
    progressBar: ProgressBarReducer,
    LessionQuestionChoice: LessionQuestionChoiceReducer,
});

export default rootReducer;
