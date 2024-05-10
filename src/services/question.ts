import axiosInstance from "./ajax";

export async function getQuestionService() {
  const url = `/api/test`;

  const data = await axiosInstance.get(url);

  // console.log(data);

  return data;
}
