import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { cardId, newQuantity } = action.payload;
      const existingCard = state.items.find(item => item.id === cardId);
      if (existingCard) {
        existingCard.quantity = newQuantity;
      }
    },
    clearCart: (state) => {
      state.items = []; // Svuotiamo il carrello
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

