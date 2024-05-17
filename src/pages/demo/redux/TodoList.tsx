import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../store";
import { Todo, add, remove, toggle } from "../../../store/todo";
import { nanoid } from "nanoid";

const TodoList: FC = () => {
  const todoList = useSelector<RootStateType, Todo[]>((state) => state.todo);

  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() =>
          dispatch(add({ id: nanoid(5), title: "我是刘伟", completed: false }))
        }
      >
        添加
      </button>
      <ul>
        {todoList.map((todo) => {
          const { id, title, completed } = todo;
          return (
            <li
              key={id}
              className="mb-2 bg-sky-300 p-2"
              style={{ textDecoration: completed ? "line-through" : "" }}
            >
              <span onClick={() => dispatch(toggle({ id }))}>{title}</span>
              &nbsp;
              <button onClick={() => dispatch(remove({ id }))}>删除</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TodoList;
