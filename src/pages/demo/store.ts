import { nanoid } from "nanoid";

export type Todo = {
  id: string;
  title: string;
};

const initialState: Todo[] = [
  { id: nanoid(5), title: "吃饭" },
  { id: nanoid(5), title: "睡觉" },
];

export default initialState;
