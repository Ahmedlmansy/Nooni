import { createSlice } from "@reduxjs/toolkit";

const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
const favoritesSlice = createSlice({
  name: "favorites",
  initialState: storedFavorites,
  reducers: {
    toggleFav: (state, action) => {
      const product = action.payload;
      const existingIndex = state.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        state.splice(existingIndex, 1);
      } else {
        state.push(product);
      }
      localStorage.setItem("favorites", JSON.stringify(state));
    },
  },
});

export const { toggleFav } = favoritesSlice.actions;
export default favoritesSlice.reducer;
