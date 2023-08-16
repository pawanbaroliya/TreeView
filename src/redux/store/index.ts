import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { elementSlice } from "../slice/element";


export const store = configureStore({
  reducer: combineReducers({
    element: elementSlice.reducer
  }),
});

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;
