import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: null,
  username: null,  // Aggiungi username
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      // Assicurati che l'username sia sempre in minuscolo
      const usernameNormalized = action.payload.username.toLowerCase();
      state.user = action.payload.user;
      state.role = action.payload.role; // Memorizza il ruolo dell'utente
      state.username = usernameNormalized; // Memorizza lo username normalizzato
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = null;
      state.username = null; // Reset dello username al logout
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

