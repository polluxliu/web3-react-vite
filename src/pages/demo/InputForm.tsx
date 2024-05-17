import { ChangeEvent, useContext, useState, type FC } from "react";
import { nanoid } from "nanoid";
import { TodoContext } from "./TodoReducer";

const InputForm: FC = () => {
  const { state, dispatch } = useContext(TodoContext);

  const [text, setText] = useState("");

  return (
    <form
      onSubmit={(event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!text.trim()) return;

        const newTodo = { id: nanoid(5), title: text };

        dispatch({ type: "add", payload: newTodo });

        setText("");
      }}
    >
      <label htmlFor="new-todo">What needs to be done?</label>
      <br />
      <input
        className="rounded-lg border-2"
        id="new-todo"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setText(event.target.value);
        }}
        value={text}
      />
      <button type="submit">Add #{state.length + 1}</button>
    </form>
  );
};

export default InputForm;
