export const QuestionSetWelcomeAction = {
    SET_QUESTION_CHOICE: 'SET_QUESTION_CHOICE',
    UPDATE_QUESTION_CHOICE: 'UPDATE_QUESTION_CHOICE',
    DELETE_QUESTION_CHOICE: 'DELETE_QUESTION_CHOICE',
};

export const setQuestionChoice = payload => ({
    type: QuestionSetWelcomeAction.SET_QUESTION_CHOICE,
    payload: payload,
});

export const updateQuestionChoice = action => ({
    type: QuestionSetWelcomeAction.UPDATE_QUESTION_CHOICE,
    payload: action,
});

export const deleteQuestionChoice = action => ({
    type: QuestionSetWelcomeAction.DELETE_QUESTION_CHOICE,
});
