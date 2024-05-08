// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import NoImmer from "./NoImmer";
import Immer from "./Immer";
import "./App.css";
import List from "./List";
import useTitle from "./hooks/useTitle";
import useMouse from "./hooks/useMouse";
import useGetInfo from "./hooks/useGetInfo";
import ClousureTrap from "./ClousureTrap";

function App() {
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   document.title = "我的测试";
  // }, []);

  useTitle("一起来测试");

  const { x, y } = useMouse();

  const { loading, info } = useGetInfo();

  return (
    <>
      <p>
        鼠标位置：{x},{y}
      </p>
      <p>{loading ? "加载中..." : info}</p>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <List />
      <NoImmer />
      <Immer />
      <ClousureTrap />
    </>
  );
}

export default App;
