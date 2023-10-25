import { createSlice } from "@reduxjs/toolkit";

export const verifySlice = createSlice({
    name: "verify",
    initialState: {},
    reducers: {
      verifyGet: (state, action) => {
        state.Token = action.payload.Token
        state.response = action.payload.response
      },
      resetverifyGet: (state, action) => {
        state.response = []
      },
    }
  });
  
  export const {verifyGet ,resetverifyGet} = verifySlice.actions;
  export default verifySlice