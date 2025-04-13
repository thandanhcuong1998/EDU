import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './Reducers/rootReducer.jsx';

export default configureStore({
  reducer: rootReducer,
});
