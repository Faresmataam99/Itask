import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isConnected: false,
};

const authSlice = createSlice({
  name: "connected",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isConnected = true;
      state.user = action.payload;
    },
    logoutAction: (state) => {
      state.user = {};
      state.isConnected = false;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions
export default authSlice.reducer
