import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/baseApi";
import toastSlice from "./toastSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    toast: toastSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
