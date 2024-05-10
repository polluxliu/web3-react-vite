import axios from "axios";

const instance = axios.create({
  timeout: 10 * 1000,
});

/*
    response interceptor
*/
instance.interceptors.response.use(
  (response) => {
    // 任何状态码在2xx范围内的都会触发此函数
    // 对响应数据做点什么
    // console.log(response.status, response.statusText, response);

    // const message = response.data.message;
    // console.info("Success:", message);

    return response.data;
  },
  (error) => {
    /**
     * 当请求发送失败或者服务器返回的 HTTP 状态码不是 2xx 时触发
     * 此时，不返回任何值，客户端获取到的将是undefined
     */

    // 任何超出2xx范围的状态码都会触发此函数
    // 做些什么来处理错误

    // console.log(error, error.response);

    if (error.response) {
      // 服务器返回了响应，并且状态码不在2xx的范围
      // const message = error.response.data.message;
      // console.error("Server Error:", message);
      // return error.response.data;
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error("Error: No response was received");
    } else {
      // 在设置请求时发生了一些事情，触发了一个错误
      console.error("Error: ", error.message);
    }
  },
);

export default instance;
