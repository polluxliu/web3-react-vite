import { useState, useRef, useEffect } from "react";
import type { FC } from "react";

// 闭包陷阱
const ClousureTrap: FC = () => {
  const [count, setCount] = useState(0);

  //通过useRef来解决闭包陷阱
  //   count是个值类型，而countRef是个引用类型
  const countRef = useRef(0);
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  function add() {
    setCount(count + 1);
  }

  //异步函数获取state时，可能获取到不是最新的state
  //这个例子中，当点击ALERT按钮之后，再快速的点击ADD按钮改变count的值，但ALERT执行时显示的是之前的值
  function alertFn() {
    setTimeout(() => {
      console.log(count);
      console.log(countRef.current); //通过useRef来解决闭包陷阱
    }, 3000);
  }

  return (
    <>
      <p>闭包陷阱</p>
      <div>
        <span>{count}</span>
        <button onClick={add}>ADD</button>
        <button onClick={alertFn}>ALERT</button>
      </div>
    </>
  );
};

export default ClousureTrap;
