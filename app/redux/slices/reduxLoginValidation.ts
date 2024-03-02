import { createSlice } from "@reduxjs/toolkit";

const loginValidation = createSlice({
    name: "loginValidation",
    initialState: {
      data: {
        isLogin: false,
      },
    },
    reducers: {
      setLoginValidation: (state, action) => {
        state.data = action.payload;
      },
    },
  });
  
  export const { setLoginValidation } = loginValidation.actions;
  export default loginValidation.reducer;