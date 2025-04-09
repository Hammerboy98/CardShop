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
      const existingCard = state.items.find(item => item.id === action.payload.id);
      if (existingCard) {
        // Se il prodotto è già nel carrello, aggiorniamo la quantità
        existingCard.quantity += action.payload.quantity;
      } else {
        // Se il prodotto non è nel carrello, lo aggiungiamo con la quantità
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    // Azione per rimuovere un prodotto dal carrello
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    // Azione per aggiornare la quantità di un prodotto nel carrello
    updateQuantity: (state, action) => {
      const { cardId, newQuantity } = action.payload;
      const existingCard = state.items.find(item => item.id === cardId);
      if (existingCard) {
        // Se il prodotto esiste, aggiorniamo la quantità
        existingCard.quantity = newQuantity;
      }
    },
  },
});

// Esportiamo le azioni per utilizzarle nei componenti
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Esportiamo il reducer per collegarlo allo store
export default cartSlice.reducer;
