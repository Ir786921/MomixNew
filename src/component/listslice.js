import { createSlice } from "@reduxjs/toolkit";

const wishlistslice = createSlice({
  name: "wishlist",
  initialState: {
    item: [],
  },
  reducers: {
    addfavourite: (state, action) => {
      state.item.push(action.payload);
    },
    removefavourite: (state, action) => {
      state.item.pop();
    },
    clearfavourite: (state) => {
      state.item = [];
    },
  },
});

export const { addfavourite, removefavourite, clearfavourite } =
  wishlistslice.actions;
export default wishlistslice.reducer;
