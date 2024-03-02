import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    data: {
        nama: "",
        email: "",
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;