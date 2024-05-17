import { useReducer, type FC } from "react";

type StateType = { count: number };
type ActionType = { type: string };

const initialState: StateType = { count: 100 };

// 根据传入的action，在原来state的基础上，返回新的state
function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const CountReducer: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <span>count:{state.count}</span>
      <br />
      <button
        onClick={() => dispatch({ type: "increment" })}
        className="m-5 bg-slate-500 p-5"
      >
        增加1
      </button>
      <br />
      <button
        onClick={() => dispatch({ type: "decrement" })}
        className="m-5 bg-slate-500 p-5"
      >
        减少1
      </button>
    </>
  );
};

export default CountReducer;
