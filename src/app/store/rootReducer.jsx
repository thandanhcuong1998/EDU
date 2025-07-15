import { combineReducers } from 'redux';
import welcomeReducer from '@/features/welcome/state/welcomeSlice.js';
import LessionQuestionChoiceReducer from '@/features/learn/redux/lessonSlice.js';
import UserProgressReducer from '@/features/user-profile/state/UserProgressReducer.jsx';
import themeReducer from '@/features/theme/state/themeSlice.js';
import authReducer from '@/features/authentication/state/authSlice.js';
import srsReducer from '@/features/srs/state/srsSlice.js';
import xpReducer from '@/features/xp/state/xpSlice.js';
import badgeReducer from '@/features/achievements/state/badgeSlice.js';
import challengeReducer from '@/features/daily-challenges/state/challengeSlice.js';
import socialReducer from '@/features/social/state/socialSlice.js';
import gameReducer from '@/features/mini-games/state/gameSlice.js';

const rootReducer = combineReducers({
    welcome: welcomeReducer,
    LessionQuestionChoice: LessionQuestionChoiceReducer,
    userProgress: UserProgressReducer,
    theme: themeReducer,
    auth: authReducer,
    srs: srsReducer,
    xp: xpReducer,
    badges: badgeReducer,
    challenges: challengeReducer,
    social: socialReducer,
    games: gameReducer,
});

export default rootReducer;