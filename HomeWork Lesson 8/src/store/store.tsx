import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: userReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Типизация состояния
export default store;
