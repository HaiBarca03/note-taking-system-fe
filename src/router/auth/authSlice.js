import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("access_token") || null,
  isAuthenticated: !!localStorage.getItem("access_token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("access_token", action.payload);
    },
    setLogout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("access_token");
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
