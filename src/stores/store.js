import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../router/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
