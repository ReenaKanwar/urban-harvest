import { createSlice } from '@reduxjs/toolkit';

// Retrieve values from localStorage if they exist
const storedEmail = localStorage.getItem('urban_harvest_remembered_email') || '';
const storedSession = localStorage.getItem('urban_harvest_session') 
  ? JSON.parse(localStorage.getItem('urban_harvest_session')) 
  : null;

const initialState = {
  user: storedSession ? storedSession.user : null,
  isAuthenticated: !!storedSession,
  rememberMeEmail: storedEmail,
  error: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { email, rememberMe, name } = action.payload;
      const user = { name: name || 'Admin User', email };
      
      state.user = user;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;

      if (rememberMe) {
        state.rememberMeEmail = email;
        localStorage.setItem('urban_harvest_remembered_email', email);
      } else {
        state.rememberMeEmail = '';
        localStorage.removeItem('urban_harvest_remembered_email');
      }

      // Persist active session
      localStorage.setItem('urban_harvest_session', JSON.stringify({ user }));
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('urban_harvest_session');
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
