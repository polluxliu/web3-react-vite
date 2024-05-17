import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counter";
import todoSlice from "./todo";

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todo: todoSlice.reducer,
  },
});

// root state的类型
export type RootStateType = ReturnType<typeof store.getState>;

export default store;
