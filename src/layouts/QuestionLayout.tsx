import type { FC } from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout: FC = () => {
  return (
    <>
      <div>QuestionLayout Layout</div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default QuestionLayout;
