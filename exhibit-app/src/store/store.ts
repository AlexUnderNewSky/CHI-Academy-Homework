// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Импортируем редьюсер

const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Типизация состояния
export default store;
