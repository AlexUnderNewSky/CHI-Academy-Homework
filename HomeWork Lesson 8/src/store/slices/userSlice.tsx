import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false, // Изначально пользователь не залогинен
  token: null, // Здесь будет храниться токен (как ключ доступа)
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload; // Здесь будет токен пользователя
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;