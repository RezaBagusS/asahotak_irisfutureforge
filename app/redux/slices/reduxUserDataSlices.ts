import { createSlice } from "@reduxjs/toolkit";

const userDataSlices = createSlice({
  name: "userData",
  initialState: {
    data: {
        id: 1,
        username: '',
        email: '',
        isInsentif: 0,
        getAccess: 0,
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = userDataSlices.actions;
export default userDataSlices.reducer;