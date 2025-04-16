import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchItmes = createAsyncThunk(
  "furniture/fetchFurniture",
  async () => {
    const res = await fetch(
      "https://furniture-api.fly.dev/v1/products?limit=100"
    );
    const data = await res.json();
    return data;
  }
);

export const itemsSlice = createSlice({
  name: "furniture",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItmes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItmes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItmes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default itemsSlice.reducer;
