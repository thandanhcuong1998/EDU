import { createSlice } from '@reduxjs/toolkit';
import { ListQuestionsSet } from '../data/ListQuestionSetWelcome.jsx';

const initialState = {
    questions: [],
    progress: 0,
};

const welcomeSlice = createSlice({
    name: 'welcome',
    initialState,
    reducers: {
        setQuestionChoice: (state, action) => {
            const { IDQuestionSet, questionChoice } = action.payload;
            const existingQuestionIndex = state.questions.findIndex(
                item => item.id === IDQuestionSet
            );

            if (existingQuestionIndex !== -1) {
                state.questions[existingQuestionIndex].questionChoice = questionChoice;
            } else {
                state.questions.push({ id: IDQuestionSet, questionChoice });
            }
        },
        removeQuestionChoice: (state, action) => {
            const { IDQuestionSet } = action.payload;
            state.questions = state.questions.filter(item => item.id !== IDQuestionSet);
        },
        updateProgress: (state) => {
            const totalQuestions = Object.keys(ListQuestionsSet).length;
            const answeredQuestions = state.questions.length;
            state.progress = (answeredQuestions / totalQuestions) * 100;
        },
        deleteQuestionChoice: state => {
            state.questions = [];
        },
        updateProgressBar: (state, action) => {
            state.progress += action.payload;
        },
        setProgressBar: (state, action) => {
            state.progress = action.payload;
        },
    },
});

export const {
    setQuestionChoice,
    removeQuestionChoice,
    deleteQuestionChoice,
    updateProgressBar,
    setProgressBar,
    updateProgress,
} = welcomeSlice.actions;

export default welcomeSlice.reducer;
