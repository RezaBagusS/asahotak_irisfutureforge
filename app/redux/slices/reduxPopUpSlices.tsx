import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    data: {
        show: false,
      type: "warning",
      title: "LOADING",
      message: "Tunggu sebentar ya . . .",
      onConfirm: null,
      onCancel: null,
    },
  },
  reducers: {
    setPopup: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPopup } = popupSlice.actions;
export default popupSlice.reducer;