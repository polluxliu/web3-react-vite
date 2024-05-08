import { useEffect } from "react";

// 自定义hook

function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]); //这里提示需要加title作为依赖
}

export default useTitle;
