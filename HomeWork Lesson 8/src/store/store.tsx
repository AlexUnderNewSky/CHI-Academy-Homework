import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  auth: {
    isAuthenticated: false, // Измените в зависимости от вашего механизма аутентификации
    user: null,
  },
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          user: action.payload,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: null,
        },
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
