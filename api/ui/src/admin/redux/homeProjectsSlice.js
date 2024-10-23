// redux/homeProjectsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const homeProjectsSlice = createSlice({
  name: 'homeProjects',
  initialState: {
    projects: [],
  },
  reducers: {
    setHomeProjects: (state, action) => {
      state.projects = action.payload; // Set the fetched projects in the state
    },
  },
});

export const { setHomeProjects } = homeProjectsSlice.actions;
export default homeProjectsSlice.reducer;
