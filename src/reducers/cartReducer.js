import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  searchTerm: "",
};
const toastOptions = {
  position: "bottom-right",
  autoClose: 1500,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const addToLocalStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        addToLocalStorage(state.cartItems);
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, quantity: 1 },
        ];
        toast.success(
          `New Item added to card "${action.payload.title}"`,
          toastOptions
        );
        addToLocalStorage(state.cartItems);
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      addToLocalStorage(state.cartItems);
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        addToLocalStorage(state.cartItems);
      }
    },
    checkLocalStorage: (state, action) => {
      state.cartItems = action.payload;
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  decreaseQuantity,
  checkLocalStorage,
  updateSearchTerm,
  setLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
