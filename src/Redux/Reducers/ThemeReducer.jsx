// Action Types
const SET_THEME = 'SET_THEME';

// Initial State
const initialState = {
    theme: 'dark' // Default theme
};

// Action Creators
export const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme
});

// Reducer
const ThemeReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
};

export default ThemeReducer;