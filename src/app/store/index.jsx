import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.jsx';

export default configureStore({
    reducer: rootReducer,
});
