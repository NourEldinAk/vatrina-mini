
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { productId, quantity, image, title, price } = action.payload;
      const productIndex = state.items.findIndex(item => item.productId === productId);
      if (productIndex >= 0) {
        state.items[productIndex].quantity += 1;
      } else {
        state.items.push({ productId, quantity, image, title, price });
      }
    },
    incrementQty(state, action) {
      const { productId } = action.payload;
      const productIndex = state.items.findIndex(item => item.productId === productId);
      if (productIndex !== -1) {
        state.items[productIndex].quantity += 1;
      }
    },
    decrementQty(state, action) {
      const { productId } = action.payload;
      const productIndex = state.items.findIndex(item => item.productId === productId);
      if (productIndex !== -1 && state.items[productIndex].quantity > 1) {
        state.items[productIndex].quantity -= 1;
      }
    },
    deleteItem(state, action) {
      const { productId } = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
    },
  }
});

export const selectCartTotal = (state)=>{
  return state.cart.items.reduce((total,item)=> total + (item.price * item.quantity) , 0)
}
export const { addToCart, incrementQty, decrementQty, deleteItem } = cartSlice.actions;
export default cartSlice.reducer;
