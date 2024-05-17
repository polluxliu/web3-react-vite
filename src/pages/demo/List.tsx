import { type FC, useContext } from "react";
import { TodoContext } from "./TodoReducer";

const List: FC = () => {
  const { state, dispatch } = useContext(TodoContext);

  return (
    <ul>
      {state.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <button
            onClick={() => {
              dispatch({ type: "delete", payload: todo.id });
            }}
          >
            删除
          </button>
        </li>
      ))}
    </ul>
  );
};

export default List;
