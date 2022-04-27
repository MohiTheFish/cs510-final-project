import { createSlice } from '@reduxjs/toolkit';

const POST_PREVIEWS = [
  {
    title: 'CS510 Assignment 1',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
  {
    title: 'CS510 Assignment 2',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
  {
    title: 'CS510 Assignment 3',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
  {
    title: 'Semantic Analysis Confusion',
    details: 'I was wondering about how we would go about solving the question. There seems to be some trick that I am missing, but I am not sure how to solve it'
  },
]
POST_PREVIEWS.forEach((p, index) => {
  p.postId = index;
});

const memSlice = createSlice({
  name: 'mem',
  initialState: {
    query: '',
    postPreviews: POST_PREVIEWS,
    expandedPost: -1,
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
    selectPost: (state, action) => {
      state.expandedPost = action.payload;
    }
  }
})

export const { updateQuery, selectPost } = memSlice.actions;

export default memSlice.reducer;