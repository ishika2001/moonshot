import { createSlice } from "@reduxjs/toolkit";

export const getCaseSlice = createSlice({
    name: "cases",
    initialState: {
      caseDetailsData:[]
    },
    reducers: {
      getCases: (state, action) => {
        state.caseDetailsData=action.payload;
      },
    }
  });
  
  export const {getCases} = getCaseSlice.actions;
  export default getCaseSlice;