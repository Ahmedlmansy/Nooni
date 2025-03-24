import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./Slices/Itmes-slice";
import favoritesReducer from "./Slices/favorites-slice";
import cartReducer from "./Slices/addToCart-slice.jsx";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
  },
});

export default store;
