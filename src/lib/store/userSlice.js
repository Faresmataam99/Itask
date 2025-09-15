import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    firstName: "",
    isAdmin: false,
  },
  isConnected: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
      if (state.user.type == "admin") {
        state.user.isAdmin = true;
        state.user.firstName = action.payload.firstName;
      }
      state.isConnected = true;
    },
    logoutAction: (state) => {
      state.user = { firstName: "" };
      state.isConnected = false;
    },
  },
});
export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
