import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
