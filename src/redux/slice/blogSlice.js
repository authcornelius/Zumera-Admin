import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    previewData: null
  },
  reducers: {
    setPreviewData: (state, action) => {
      state.previewData = action.payload;
    },
    clearPreviewData: (state) => {
      state.previewData = null;
    }
  }
});

export const { setPreviewData, clearPreviewData } = blogSlice.actions;
export default blogSlice.reducer;
