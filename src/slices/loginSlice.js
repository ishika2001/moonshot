import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: "email",
    initialState: {
      isLoadingCondition:false
    },
    reducers: {
      emailGet: (state, action) => {
        state.email = action.payload.email
      },
      isLoading: (state, action) => {
        state.isLoadingCondition = action.payload
      },
    }
  });
  
  export const { emailGet,isLoading } = loginSlice.actions;
  export default loginSlice;