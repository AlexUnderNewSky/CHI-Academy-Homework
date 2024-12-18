import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserI } from "../../../interfaces";

interface UserState {
  user: UserI | null;
}

interface UserState {
  isAuthenticated: boolean;
  token: string | null; 
}

// Указываем типы для initialState
const initialState: UserState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        state.isAuthenticated = !!token;
        state.token = token;
      }
    },
  },
});

export const { setUser, login, logout, initializeAuth } = userSlice.actions;
export default userSlice.reducer;
