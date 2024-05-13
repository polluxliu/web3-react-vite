import type { FC } from "react";
// import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Spin } from "antd";
// import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../services/question";

type Question = {
  id: number;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: Date;
  isDeleted: boolean;
};

const List: FC = () => {
  // const [searchParams] = useSearchParams();

  // 给 data 设置初始值，这样获取到的 data 的类型就不是 ApiResponseData | undefined 而是 ApiResponseData
  const { loading, data = {} } = useRequest(getQuestionListService);

  // 将 ApiResponseData 转换为具体的类型
  const { list } = data as {
    list: Question[];
    total: number;
  };

  return (
    <>
      {loading && (
        <div className="p-3 text-center">
          <Spin />
        </div>
      )}

      {!loading &&
        list.length > 0 &&
        list.map((item: Question) => {
          const { id, title } = item;
          return <div key={id}>{title}</div>;
        })}
    </>
  );
};

export default List;
