import { configureStore } from '@reduxjs/toolkit';
import memReducer from 'redux/memSlice';

export default configureStore({
  reducer: {
    mem: memReducer,
  },
});
