import axiosInstance, { ApiResponseData } from "./ajax";

export async function getItemService(): Promise<ApiResponseData> {
  const url = `/api/items`;
  const data = (await axiosInstance.get(url)) as ApiResponseData;
  return data;
}
