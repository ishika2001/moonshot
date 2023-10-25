import { createSlice } from "@reduxjs/toolkit";

export const pinSlice = createSlice({
    name: "pin",
    initialState: {},
    reducers: {
      verifyPinGet: (state, action) => {
        state.Token = action.payload.Token
        state.response = action.payload.response
      },
      resetverifyPinGet: (state, action) => {
        state.response = []
      },
    }
  });
  
  export const {verifyPinGet ,resetverifyPinGet} = pinSlice.actions;
  export default pinSlice