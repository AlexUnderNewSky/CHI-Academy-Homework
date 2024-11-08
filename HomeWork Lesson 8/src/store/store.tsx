// store.tsx
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,  // Keep only one to avoid redundancy
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
