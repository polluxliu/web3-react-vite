import { type FC, createContext, useReducer } from "react";
import reducer, { Action } from "./reducer";
import initialState from "./store";
import List from "./List";
import InputForm from "./InputForm";

export const TodoContext = createContext({
  state: initialState,
  dispatch: (action: Action) => {
    console.log(action);
  },
});

const TodoReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <p>Todo list with useReducer</p>
      <List />
      <InputForm />
    </TodoContext.Provider>
  );
};

export default TodoReducer;
