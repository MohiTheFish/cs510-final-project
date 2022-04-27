import { createSlice } from '@reduxjs/toolkit';

const memSlice = createSlice({
  name: 'mem',
  initialState: {
    query: '',
    postPreviews: [],
    expandedPost: {},
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload.text;
    }
  }
})

export const { updateQuery } = memSlice.actions;

export default memSlice.reducer;