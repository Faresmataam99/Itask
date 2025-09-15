import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {},
  isCompleted: false,
  isAdded: false,
};

export const tasksSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.isAdded = true;
      state.tasks = action.payload;
    },
    isCompleted: (state, action) => {
      state.isCompleted = true;
      state.tasks = action.payload;
    },
    deletetask: (state) => {
      state.tasks = {};
      state.isAdded = false;
    },
  },
});

export const { addTask, isCompleted, deletetask } = tasksSlice.actions;
export default tasksSlice.reducer;
