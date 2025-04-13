export const LessionQuestionChoiceAction = {
  SET_ANSWER: 'SET_ANSWER',
  UPDATE_QUESTION_INDEX: 'UPDATE_QUESTION_INDEX',
};

export const setAnswer = action => ({
  type: LessionQuestionChoiceAction.SET_ANSWER,
  payload: action,
});

export const updateQuestionIndex = () => ({
  type: LessionQuestionChoiceAction.UPDATE_QUESTION_INDEX,
});
