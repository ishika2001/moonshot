import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import verifySlice from "./verifySlice";
import getjobSlice from "./getjobSlice";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import checkSlice from "./checkSlice";
import checkVerifySlice from "./checkVerify";
import thunk from "redux-thunk";
import { getCaseSlice } from "./getCaseSlice";
import { identitySlice } from "./identitySlice";
import { pinSlice } from "./pinSlice";

const reducers = combineReducers({
  emails: loginSlice.reducer,
  verifys: verifySlice.reducer,
  jobs: getjobSlice.reducer,
  checks: checkSlice.reducer,
  checkedVerifys: checkVerifySlice.reducer,
  cases: getCaseSlice.reducer,
  identity: identitySlice.reducer,
  pin: pinSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
  // middleware: getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
})

export default store
