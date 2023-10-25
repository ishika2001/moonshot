import { createSlice } from "@reduxjs/toolkit";

export const checkVerifySlice = createSlice({
    name: "check",
    initialState: {
        isVerify: false,
        alertShow:false,
        count:3,
    },
    reducers: {
      verfifyChecked: (state, action) => {
        state.isVerify = action.payload
      },
      alertChecked: (state, action) => {
        state.alertShow = action.payload
      },
      attempCount:(state,action)=>{
        state.count=action.payload;
      }
    }
  });
  
  export const { verfifyChecked ,alertChecked,attempCount} = checkVerifySlice.actions;
  export default checkVerifySlice