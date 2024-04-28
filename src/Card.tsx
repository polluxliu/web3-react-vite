import type { FC } from "react";
// import StateDemo from "./StateDemo";
import "./Card.css";

type PropsType = {
  id: string;
  title: string;
  isPublished: boolean;
  deleteQuestion: (id: string) => void;
  publishQuestion: (id: string) => void;
};

const Card: FC<PropsType> = (props) => {
  const { id, title, isPublished, deleteQuestion, publishQuestion } = props;

  function pub(id: string) {
    console.log("pub ", id);
    publishQuestion(id);
  }

  function del(id: string) {
    console.log("delete ", id);
    deleteQuestion(id);
  }

  return (
    <>
      {/* <StateDemo /> */}
      <div className="list-item">
        <strong>{title}</strong>
        &nbsp;
        {isPublished ? (
          <span style={{ color: "green" }}>已发布</span>
        ) : (
          <span>未发布</span>
        )}
        <button
          onClick={() => {
            pub(id);
          }}
        >
          发布问卷
        </button>
        &nbsp;
        <button
          onClick={() => {
            del(id);
          }}
        >
          删除
        </button>
      </div>
    </>
  );
};

export default Card;
