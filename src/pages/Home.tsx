import type { FC } from "react";
// import { useRequest } from "ahooks";
// import {
//   getQuestionService,
//   getQuestionListService,
// } from "../services/question";
import Waterfall from "../components/Waterfall";

const Home: FC = () => {
  // const {
  //   loading: testLoading,
  //   data: testData,
  //   run: loadTestData,
  // } = useRequest(
  //   async () => {
  //     const data = await getQuestionService();
  //     return data;
  //   },
  //   {
  //     manual: true,
  //   },
  // );

  // const {
  //   loading: questionLoading,
  //   data: questionData,
  //   run: loadQuestionData,
  // } = useRequest(
  //   async () => {
  //     const data = await getQuestionListService();
  //     return data;
  //   },
  //   {
  //     manual: true,
  //   },
  // );

  return (
    <>
      <Waterfall />
      {/* <p>My Home</p>
      <button
        className="m-6 bg-sky-500 p-6"
        onClick={loadTestData}
        disabled={testLoading}
      >
        {testLoading ? "loading" : "获取测试数据"}
      </button>
      <p>{JSON.stringify(testData)}</p>
      <button
        className="m-6 bg-sky-500 p-6"
        onClick={loadQuestionData}
        disabled={questionLoading}
      >
        {questionLoading ? "loading" : "获取列表数据"}
      </button>
      <p>{JSON.stringify(questionData)}</p> */}
    </>
  );
};

export default Home;
