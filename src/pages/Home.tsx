import type { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";

const Home: FC = () => {
  const nav = useNavigate();

  function login() {
    // nav("login");
    nav({
      pathname: "login",
      search: "a=23",
    });
  }

  return (
    <>
      <p>My Home</p>
      <div>
        <button onClick={login}>登录</button>
        <Link to="register">注册</Link>
        <Button type="primary">antd button</Button>
      </div>
    </>
  );
};

export default Home;
