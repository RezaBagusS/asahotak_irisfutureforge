import { createSlice } from "@reduxjs/toolkit";

const menuMobileSlices = createSlice({
  name: "menuMobile",
  initialState: {
    data: {
        show: false,
    },
  },
  reducers: {
    setToggleMenu: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setToggleMenu } = menuMobileSlices.actions;
export default menuMobileSlices.reducer;