import { Todo } from "./store";

export type Action = {
  type: string;
  payload?: unknown;
};

export default function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case "add":
      return state.concat(action.payload as Todo);
    case "delete":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      throw new Error();
  }
}
