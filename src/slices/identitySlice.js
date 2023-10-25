import { createSlice } from "@reduxjs/toolkit";

export const identitySlice = createSlice({
    name: "identity",
    initialState: {
      isLoadingCondition:false
    },
    reducers: {
      identityGet: (state, action) => {
        state.email = action.payload.email
      },
      getSchedule: (state, action) => {
        state.schedule = action.payload.schedule
      },
      isLoading: (state, action) => {
        state.isLoadingCondition = action.payload
      },
    }
  });
  
  export const { identityGet,isLoading,getSchedule } = identitySlice.actions;
  export default identitySlice;