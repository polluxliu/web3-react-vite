import axiosInstance, { ApiResponse } from "./ajax";

export async function getQuestionService(): Promise<ApiResponse> {
  const url = `/api/test`;

  const data = await axiosInstance.get(url);

  return data;
}
