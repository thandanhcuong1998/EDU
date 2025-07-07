import { combineReducers } from 'redux';
import welcomeReducer from '@/features/welcome/state/welcomeSlice.js';
import LessionQuestionChoiceReducer from '@/features/learn/redux/lessonSlice.js';
import UserProgressReducer from '@/features/user-profile/state/UserProgressReducer.jsx';
import themeReducer from '@/features/theme/state/themeSlice.js';

const rootReducer = combineReducers({
    welcome: welcomeReducer,
    LessionQuestionChoice: LessionQuestionChoiceReducer,
    userProgress: UserProgressReducer,
    theme: themeReducer,
});

export default rootReducer;
