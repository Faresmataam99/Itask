import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./store/userSlice";
import { tasksSlice } from "./store/TasksSlice";
export default () => {
  return configureStore({
    reducer: {
      user: userSlice.reducer,
      task: tasksSlice.reducer,
    },
  });
};
