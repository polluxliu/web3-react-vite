import { useState, type FC } from "react";

const CountReducer: FC = () => {
  const [count, setCount] = useState(100);

  return (
    <>
      <span>count:{count}</span>
      <br />
      <button
        onClick={() => setCount(count + 1)}
        className="m-5 bg-slate-500 p-5"
      >
        增加1
      </button>
      <br />
      <button
        onClick={() => setCount(count - 1)}
        className="m-5 bg-slate-500 p-5"
      >
        减少1
      </button>
    </>
  );
};

export default CountReducer;
