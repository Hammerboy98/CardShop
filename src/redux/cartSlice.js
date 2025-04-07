import { createSlice } from '@reduxjs/toolkit';

// Inizializziamo lo stato del carrello come un array vuoto
const initialState = {
  items: [],
};

// Creiamo una slice per il carrello
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Azione per aggiungere un prodotto al carrello
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    // Azione per rimuovere un prodotto dal carrello
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// Esportiamo le azioni per utilizzarle nei componenti
export const { addToCart, removeFromCart } = cartSlice.actions;

// Esportiamo il reducer per collegarlo allo store
export default cartSlice.reducer;