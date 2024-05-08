import type { FC } from "react";
import { useState } from "react";
import { produce } from "immer";

const Immer: FC = () => {
  // console.log("AJAX网络请求2");

  const [userInfo, setUserInfo] = useState({ name: "PAUL", age: 25 });
  const [list, setList] = useState(["x1", "x2"]);

  function changeAge() {
    // setUserInfo({
    //   ...userInfo,
    //   age: 26,
    // });

    setUserInfo(
      produce((draft) => {
        draft.age = 21;
      }),
    );
  }

  function addItem() {
    // setList(list.concat("x3"));
    setList(
      produce((draft) => {
        draft.push("x3");
      }),
    );
  }

  return (
    <div>
      <h2>State是不可变数据，使用Immer</h2>
      <div>{JSON.stringify(userInfo)}</div>
      <button onClick={changeAge}>Change Age</button>
      <div>{JSON.stringify(list)}</div>
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};

export default Immer;
