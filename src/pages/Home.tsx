import type { FC } from "react";
import { useRequest } from "ahooks";
import { getQuestionService } from "../services/question";

const Home: FC = () => {
  const loadData = async () => {
    const data = await getQuestionService();
    return data;
  };

  const {
    loading,
    data,
    run: test,
  } = useRequest(loadData, {
    manual: true,
  });

  return (
    <>
      <p>My Home</p>
      <button className="m-6 bg-sky-500 p-6" onClick={test} disabled={loading}>
        {loading ? "loading" : "获取数据"}
      </button>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default Home;
