export const ProgressBarAction = {
    SET_PROGRESS_BAR: 'SET_PROGRESS_BAR',
    UPDATE_PROGRESS_BAR: 'UPDATE_PROGRESS_BAR',
};

export const setProgessBar = payload => ({
    type: ProgressBarAction.SET_PROGRESS_BAR,
    payload: payload,
});

export const updateProgressBar = action => ({
    type: ProgressBarAction.UPDATE_PROGRESS_BAR,
    payload: action,
});
