import { useState } from "react";
import type { FC } from "react";
import Card from "./Card";

const List: FC = () => {
  const [questionList, setQuestionList] = useState([
    { id: "q1", title: "问卷1", isPublished: true },
    { id: "q2", title: "问卷2", isPublished: true },
    { id: "q3", title: "问卷3", isPublished: false },
    { id: "q4", title: "问卷4", isPublished: false },
  ]);

  function add() {
    const id = Math.random().toString().slice(-3);
    setQuestionList(
      questionList.concat({
        id: "q" + id,
        title: "问卷" + id,
        isPublished: false,
      }),
    );
  }

  function deleteQuestion(id: string) {
    setQuestionList(
      questionList.filter((q) => {
        if (q.id === id) return false;
        else return true;
      }),
    );
  }

  function publishQuestion(id: string) {
    setQuestionList(
      questionList.map((q) => {
        if (q.id !== id) return q;

        return { ...q, isPublished: true };
      }),
    );
  }

  return (
    <>
      <h1>问卷列表页</h1>
      {questionList.map((question) => {
        const { id, title, isPublished } = question;
        return (
          <Card
            key={id}
            id={id}
            title={title}
            isPublished={isPublished}
            deleteQuestion={deleteQuestion}
            publishQuestion={publishQuestion}
          />
        );
      })}
      <button onClick={add}>新增问卷</button>
    </>
  );
};

export default List;
