import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';  // Importiamo il reducer per il carrello

// Configuriamo lo store Redux
export const store = configureStore({
  reducer: {
    cart: cartReducer,  // Definiamo il nostro reducer per il carrello
  },
});