import type { FC } from "react";
import { useState } from "react";

const NoImmer: FC = () => {
  const [userInfo, setUserInfo] = useState({ name: "PAUL", age: 25 });

  function changeAge() {
    setUserInfo({
      ...userInfo,
      age: 26,
    });
  }

  return (
    <div>
      <h2>State是不可变数据</h2>
      <div>{JSON.stringify(userInfo)}</div>
      <button onClick={changeAge}>Change Age</button>
    </div>
  );
};

export default NoImmer;
