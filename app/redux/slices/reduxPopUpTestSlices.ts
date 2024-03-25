import { createSlice } from "@reduxjs/toolkit";

const popupTest = createSlice({
  name: "popup",
  initialState: {
    data: {
        show: false,
      onConfirm: null,
      onCancel: null,
    },
  },
  reducers: {
    setPopupTest: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPopupTest } = popupTest.actions;
export default popupTest.reducer;