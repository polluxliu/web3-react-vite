import { useState, useEffect } from "react";

// 获取鼠标位置
function useMouse() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const mouseMoveHandler = (event: MouseEvent) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  useEffect(() => {
    // 监听鼠标事件
    window.addEventListener("mouseover", mouseMoveHandler);

    // 组件销毁时，解绑DOM事件
    return () => {
      window.removeEventListener("mouseover", mouseMoveHandler);
    };
  }, []);

  return { x, y };
}

export default useMouse;
