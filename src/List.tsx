import { useState } from "react";
import type { FC } from "react";
import Card from "./Card";
import { produce } from "immer";

const List: FC = () => {
  // console.log("AJAX网络请求");

  // useEffect(() => {
  //   console.log("AJAX网络请求");
  //   return () => {
  //     console.log("销毁");
  //   };
  // });

  const [questionList, setQuestionList] = useState([
    { id: "q1", title: "问卷1", isPublished: true },
    { id: "q2", title: "问卷2", isPublished: true },
    { id: "q3", title: "问卷3", isPublished: false },
    { id: "q4", title: "问卷4", isPublished: false },
  ]);

  // useEffect(() => {
  //   console.log("Question list changed");
  // }, [questionList]);

  function add() {
    const id = Math.random().toString().slice(-3);

    // setQuestionList(
    //   questionList.concat({
    //     id: "q" + id,
    //     title: "问卷" + id,
    //     isPublished: false,
    //   }),
    // );

    setQuestionList(
      produce((draft) => {
        draft.push({
          id: "q" + id,
          title: "问卷" + id,
          isPublished: false,
        });
      }),
    );
  }

  function deleteQuestion(id: string) {
    // setQuestionList(
    //   questionList.filter((q) => {
    //     if (q.id === id) return false;
    //     else return true;
    //   }),
    // );

    setQuestionList(
      produce((draft) => {
        const index = draft.findIndex((q) => q.id === id);
        draft.splice(index, 1);
      }),
    );
  }

  function publishQuestion(id: string) {
    // setQuestionList(
    //   questionList.map((q) => {
    //     if (q.id !== id) return q;
    //     return { ...q, isPublished: true };
    //   }),
    // );

    setQuestionList(
      produce((draft) => {
        const q = draft.find((q) => q.id === id);
        if (q) q.isPublished = true;
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
