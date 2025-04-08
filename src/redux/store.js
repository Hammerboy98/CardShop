import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // Assicurati che il percorso sia corretto

const store = configureStore({
  reducer: {
    cart: cartReducer, // Aggiungi il reducer per il carrello
  },
});

export {store};