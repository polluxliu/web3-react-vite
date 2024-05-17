import { createSlice } from "@reduxjs/toolkit";

// 在这里定义slice state的类型

const initialState: number = 100;

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    increase(state: number) {
      return state + 1;
    },
    decrease(state: number) {
      return state - 1;
    },
  },
});

export const { increase, decrease } = counterSlice.actions;

export default counterSlice;
