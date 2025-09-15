import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./store/userSlice";
import { tasksSlice } from "./store/tasksSlice";
export default () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      task: tasksSlice.reducer,
    },
  });
};
