import { type FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../../store";
import { increase, decrease } from "../../../store/counter";

const Count: FC = () => {
  const count = useSelector<RootStateType, number>((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <span>count: {count}</span>
      <button
        className="m-2 block bg-sky-300 p-6"
        onClick={() => dispatch(increase())}
      >
        增加
      </button>
      <button
        className="m-2 block bg-sky-300 p-6"
        onClick={() => dispatch(decrease())}
      >
        删除
      </button>
    </div>
  );
};

export default Count;
