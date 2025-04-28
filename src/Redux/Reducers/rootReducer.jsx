import { combineReducers } from 'redux';
import QuestionSetWelcomeReducer from './QuestionSetWelcome.jsx';
import ProgressBarReducer from './ProgressBar.jsx';
import LessionQuestionChoiceReducer from './LessionQuestionChoiceReducer.jsx';
import UserProgressReducer from './UserProgressReducer.jsx';
import ThemeReducer from './ThemeReducer.jsx';

const rootReducer = combineReducers({
    questionChoiceWelcome: QuestionSetWelcomeReducer,
    progressBar: ProgressBarReducer,
    LessionQuestionChoice: LessionQuestionChoiceReducer,
    userProgress: UserProgressReducer,
    theme: ThemeReducer,
});

export default rootReducer;
