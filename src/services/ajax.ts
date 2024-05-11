import axios from "axios";
import { message } from "antd";

export type ApiResponse = {
  message?: string;
  data?: ApiResponseData;
};

export type ApiResponseData = {
  [index: string]: unknown;
};

const instance = axios.create({
  timeout: 10 * 1000,
});

/**
 * 成功时返回的是服务端数据 ApiResponse ，失败时将异常吃掉，并包装为 ApiResponse 返回
 * 经过拦截器的配置以后，无论是否异常Axios返回的实际数据类型为 Promise<ApiResponse>
 */
instance.interceptors.response.use(
  (response) => {
    // 任何状态码在2xx范围内的都会触发此函数
    // 对响应数据做点什么
    // console.log(response.status, response.statusText, response);

    const responseMessage = response.data.message;
    message.info(responseMessage);
    // console.info("Success:", responseMessage);

    return response.data;
  },
  (error) => {
    /**
     * 当请求发送失败或者服务器返回的 HTTP 状态码不是 2xx 时触发
     * 此时，不返回任何值，客户端获取到的是undefined
     */

    // 任何超出2xx范围的状态码都会触发此函数
    // 做些什么来处理错误

    // console.log(error, error.response);

    const response: ApiResponse = {};

    if (error.response) {
      // 服务器返回了响应，并且状态码不在2xx的范围
      if (error.response.data !== "") {
        response.message = error.response.data.message;
        response.data = error.response.data.data;
      } else {
        response.message = error.message;
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      response.message = "No response was received";
    } else {
      // 在设置请求时发生了一些事情，触发了一个错误
      response.message = error.message;
    }
    // console.error("Error: ", response.message);

    message.error(response.message);

    return response;
  },
);

export default instance;
