import type { FC } from "react";
import { useEffect, useRef } from "react";
// import StateDemo from "./StateDemo";
// import "./Card.css";
import styles from "./Card.module.scss";
import classNames from "classnames";

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
    // console.log("pub ", id);
    publishQuestion(id);
  }

  function del(id: string) {
    // console.log("delete ", id);
    deleteQuestion(id);
  }

  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;

    console.log("card mounted", renderCount.current);

    return () => {
      console.log("card unmounted");
    };
  }, [isPublished]);

  const itemClassName = classNames({
    [styles["list-item"]]: true,
    [styles["published"]]: isPublished,
  });

  return (
    <>
      {/* <StateDemo /> */}
      {/* <div className={styles["list-item"]}> */}
      <div className={itemClassName}>
        <strong>{title}</strong>
        &nbsp;
        {isPublished ? (
          // <span style={{ color: "green" }}>已发布</span>
          <span className={styles["published-span"]}>已发布</span>
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
