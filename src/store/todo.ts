import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// 在这里定义slice state的类型
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

const initialState: Todo[] = [
  { id: nanoid(5), title: "测试1", completed: false },
  { id: nanoid(5), title: "测试2", completed: true },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    add(state: Todo[], action: PayloadAction<Todo>) {
      return [action.payload, ...state];
    },
    remove(state: Todo[], action: PayloadAction<{ id: string }>) {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    toggle(state: Todo[], action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      return state.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, completed: !todo.completed };
      });
    },
  },
});

export const { add, remove, toggle } = todoSlice.actions;

export default todoSlice;
