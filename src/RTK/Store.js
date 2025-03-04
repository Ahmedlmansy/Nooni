import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./Slices/Itmes-slice";
import favoritesReducer from "./Slices/favorites-slice";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
