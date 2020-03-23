// 错误提示
// import { Toast } from "vant";
// import Vue from "vue"; 
import { getRequestParams } from "../../utils/tool";
import config from "../../config/index";
var baseParams = getRequestParams();
var Fly = require("flyio/dist/npm/fly");
var fly = new Fly();
// fly.config.baseURL = config.apiHeadUrl;
fly.config.timeout = "5000";
const HTTP_CODE = {
  BAD_REQUEST: 400, // 1.语义有误, 2.请求参数有误
  UNAUTHORIZED: 401, // 授权证书未被接受
  FORBIDDEN: 403, // 没有权限访问，未授权
  NOT_FOUND: 404, // 请求失败，请求所希望得到的资源未被在服务器上发现
  INTERNAL_SERVER_ERROR: 500 // 服务器内部错误
};
console.log(config.apiHeadUrl);
// 添加请求拦截器
fly.interceptors.request.use(request => {
  //   console.log(request);
  request.headers["X-Requested-With"] = "XMLHttpRequest";
  if (request.method == 'POST') { //eslint-disable-line
    request.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  // //给所有请求添加自定义header
  baseParams.request_time = Date.parse(new Date()) / 1000;
  console.log(baseParams);
  request.body = {
    ...baseParams,
    ...request.body
  };
  // request.body.token = makeSign(request.body);
  // 打印出请求体
  console.log(request.body);
  // 终止请求
  // var err=new Error("xxx")
  // err.request=request
  // return Promise.reject(new Error(""))

  // 可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
});

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  response => {
    // 只将请求结果的data字段返回  按情况进行修改
    if (response.data.success !== "0") {
      // Toast(response.data.message || '未知错误')
    } else {
      // Toast.clear();
    }
    return response;
  },
  err => {
    // 发生网络错误后会走到这里
    // return Promise.resolve("ssss")
    console.log(err);
    var message = "";
    if (err.status !== 0 && err.response) {
      if (err.response.data && err.response.data.message) {
        message = err.response.data.message;
      } else {
        // message = ERROR_MESSAGE[err.status]
        switch (err.status) {
          case HTTP_CODE.BAD_REQUEST:
            console.log("BAD_REQUEST");
            message = "数据出错";
            break;
          case HTTP_CODE.UNAUTHORIZED:
            console.log("UNAUTHORIZED");
            message = "登录过期，请重新登录";
            return;
          case HTTP_CODE.FORBIDDEN:
            console.log("FORBIDDEN");
            message = "对不起，您没有权限访问";
            break;
          case HTTP_CODE.NOT_FOUND:
            console.log("NOT_FOUND");
            message = "访问不到请求的资源";
            break;
          case HTTP_CODE.INTERNAL_SERVER_ERROR:
            console.log("INTERNAL_SERVER_ERROR");
            message = "服务器离家出走了";
            break;
          default:
            break;
        }
      }
      if (message === '') { //eslint-disable-line
        message = "未知错误";
      }
      if (typeof message === "string") {
        console.log(message);
      } else {
        console.log("api err msg", message);
      }
    } else {
      if (err.status === "1") {
        console.log("网络超时");
        message = "网络超时";
      }
    }
    // Vue.prototype.$toast.center(message || "未知错误");
  }
);
export default {
  get(url, param) {
    let requestUrl = config.apiHeadUrl + url;
    return new Promise(resolve => {
      fly
        .get({
          url: requestUrl,
          data: param
        })
        .then(res => {
          resolve(res);
        });
    });
  },
  post(url, param) {
    let requestUrl = config.apiHeadUrl + url;
    return new Promise(resolve => {
      fly.post(requestUrl, param).then(res => {
        resolve(res);
      });
    });
  }
};
