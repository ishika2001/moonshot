import { createSlice } from "@reduxjs/toolkit";

export const checkSlice = createSlice({
    name: "check",
    initialState: {
        isCheck: false
    },
    reducers: {
      getChecked: (state, action) => {
        state.isCheck = action.payload
      },
    }
  });
  
  export const { getChecked } = checkSlice.actions;
  export default checkSlice