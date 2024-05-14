import axiosInstance, { ApiResponseData } from "./ajax";

type SearchOptions = {
  pageNumber: number;
  pageSize: number;
};

export async function getItemService(
  opt: Partial<SearchOptions> | undefined = undefined,
): Promise<ApiResponseData> {
  const url = `/api/items`;
  const data = (await axiosInstance.get(url, {
    params: opt,
  })) as ApiResponseData;

  return data;
}
