import { useEffect, useRef, useState, type FC } from "react";
// import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const testRef = useRef(Math.random());

  const [name2] = useState(Math.random());

  const [name, setName] = useState(100);
  // console.log("refresh", name);

  useEffect(() => {
    // console.log("test");
    // return () => {
    //   console.log("clean");
    // };
    console.log(testRef.current);
  }, [name]);

  // const nav = useNavigate();
  return (
    <>
      <p>
        Login:{name},Name2:{name2}
      </p>
      <div>
        <button
          onClick={() => {
            // nav(-1);
            setName(Math.random());
          }}
        >
          返回
        </button>
      </div>
    </>
  );
};

export default Login;
