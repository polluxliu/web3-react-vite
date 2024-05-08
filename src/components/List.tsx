import type { FC } from "react";
import { useState } from "react";
import Card from "./Card";
import styles from "./List.module.scss";

const rawData = [
  {
    id: "q1",
    title: "问卷1",
    isPublished: true,
    isStar: false,
    answerCount: 6,
    createAt: "2024-4-29",
  },
  {
    id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 5,
    createAt: "2024-4-27",
  },
  {
    id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: false,
    answerCount: 2,
    createAt: "2024-4-23",
  },
  {
    id: "q4",
    title: "问卷4",
    isPublished: false,
    isStar: true,
    answerCount: 0,
    createAt: "2024-4-21",
  },
];

const List: FC = () => {
  const [questionList] = useState(rawData);

  return (
    <>
      <div className={styles["header"]}>
        <div className={styles["left"]}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles["right"]}>搜索框</div>
      </div>
      <div className={styles["content"]}>
        {questionList.map((q) => {
          const { id } = q;
          return <Card key={id} {...q}></Card>;
        })}
      </div>
      <div className={styles["footer"]}></div>
    </>
  );
};

export default List;
