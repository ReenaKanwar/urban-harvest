import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'dashboard',
  sidebarOpen: false, // Control sidebar toggle on mobile
};

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    navigateTo: (state, action) => {
      state.currentPage = action.payload;
      state.sidebarOpen = false; // Close sidebar drawer on route navigation (for mobile)
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    }
  }
});

export const { navigateTo, toggleSidebar, setSidebarOpen } = navSlice.actions;
export default navSlice.reducer;
