import axiosInstance, { ApiResponseData } from "./ajax";

export async function getQuestionService(): Promise<ApiResponseData> {
  const url = `/api/test`;
  const data = (await axiosInstance.get(url)) as ApiResponseData;
  return data;
}

export async function getQuestionListService(): Promise<ApiResponseData> {
  const url = "/api/question";
  const data = (await axiosInstance.get(url)) as ApiResponseData;

  return data;
}
