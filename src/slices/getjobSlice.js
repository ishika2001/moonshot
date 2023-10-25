import { createSlice } from "@reduxjs/toolkit";

export const getjobSlice = createSlice({
    name: "job",
    initialState: {
      jobData:[],
      jobId:''
    },
    reducers: {
      getJob: (state, action) => {
        state.jobData=action.payload;
      },
      getJobId: (state, action) => {
        state.jobId=action.payload;
      },
    }
  });
  
  export const {getJob,getJobId } = getjobSlice.actions;
  export default getjobSlice;