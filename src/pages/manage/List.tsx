import type { FC } from "react";
import { useSearchParams } from "react-router-dom";

const List: FC = () => {
  const [searchParams] = useSearchParams();

  return <p>List {searchParams.get("k")}</p>;
};

export default List;
