// store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Assicurati che il percorso sia corretto
import authReducer from './authSlice'; // Importa il reducer per l'autenticazione

const store = configureStore({
  reducer: {
    cart: cartReducer, // Aggiungi il reducer per il carrello
    auth: authReducer, // Aggiungi il reducer per l'autenticazione
  },
});

export { store };
