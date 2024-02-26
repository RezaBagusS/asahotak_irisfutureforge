import { createSlice } from "@reduxjs/toolkit";

const popupPptSlice = createSlice({
  name: "popupPpt",
  initialState: {
    data: {
        show: false,
        link: "",
    },
  },
  reducers: {
    setPopupPpt: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setPopupPpt } = popupPptSlice.actions;
export default popupPptSlice.reducer;