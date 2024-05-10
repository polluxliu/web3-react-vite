import type { FC } from "react";
import { useEffect } from "react";
import { getQuestionService } from "../services/question";

const Home: FC = () => {
  useEffect(() => {
    async function fn() {
      const data = await getQuestionService();
      console.log(data);
    }
    fn();
  }, []);

  return (
    <>
      <p>My Home</p>
    </>
  );
};

export default Home;
