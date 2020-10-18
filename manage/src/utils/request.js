import axios from 'axios';
import { Message } from 'element-ui';
import qs from 'qs'
// qs.parse()将URL解析成对象的形式
// qs.stringify()将对象整理成url
// 引入node.js中的qs模块
// ------FormData形式的数据

// 防止单页出现多个ajax错误，每次只允许出现一个message.err 实例
let ajaxHiddenMessage = false;

/**
 * 错误提示弹出逻辑
 * @param {Boolean} hiddenMessage 此次调用err 是否启用message提示
 * @param {String} message 提示文本信息
 * ajaxHiddenMessage 防止单页多请求失败，造成连续错误提示，每次仅允许一个错误提示
 * 根据 message 弹出时间，三秒内至多存在一个错误提示
 */
function showMessage({ hiddenMessage, message }) {
  // console.log(hiddenMessage, message);
  if (hiddenMessage || ajaxHiddenMessage) return;
  Message({
    type: 'error',
    message,
    showClose: true
  });
  ajaxHiddenMessage = true;
  setTimeout(() => {
    ajaxHiddenMessage = false;
  }, 3000);
}

// 创建实例, 传入默认配置
const instance = axios.create({
  timeout: 2000 // ms,
});

// 请求拦截器, 请求前发送前都会通过该函数
instance.interceptors.request.use(
  config => {
    //********************1、是否添加令牌  2、正测试环境区分 */

    // console.log('请求前: ', config);
    // console.log('地址栏域名: ', window.location.hostname);
    if (window.location.hostname == '前端项目部署域名.cn' || window.location.hostname == '前端项目部署域名.com') {
      config.baseURL = "服务端接口部署域名"
    } else {
      config.baseURL = "/lwy"
    }

    // console.log('请求参数: ',config);
    if (config.data.needToken) {//兼容 payload 形式
      console.log("payload形式参数 检测到needToken")
      let accessToken = sessionStorage.getItem('access_token');
      config.headers.Authorization = 'Bearer ' + accessToken;
      delete config.data.needToken
    }else if(qs.parse(config.data).needToken){//兼容 Form Data 形式
      console.log("Form Data形式参数 检测到needToken")
      let accessToken = sessionStorage.getItem('access_token');
      config.headers.Authorization = 'Bearer ' + accessToken;
      var configSend = qs.parse(config.data)
      // console.log(configSend)
      delete configSend.needToken
      // console.log(configSend)
      config.data = qs.stringify(configSend)
      // console.log(config.data)
    }

    // config.headers['Content-Type'] = 'application/json; charset=UTF-8';
    // config.post['Content-Type'] = 'application/json';
    // console.log('******请求前: ', config);
    return config;
  },
  err => {
    // @todo 这个什么时候会触发啊
    // console.log('请求前失败: ', err);
    return Promise.reject(err);
  }
);


instance.interceptors.response.use(
  res => {
    // console.log('响应前: ');
    if (res.status === 200) {
      // console.log('是200');
      return res;
    }
  },
  err => {
    // console.log('响应前失败: ', err.response); // 响应体存在err.response对象中
    // 实测: timeout前没有后端没有任何返回的话, err.response是空的
    // 然后这样的前端超时, 那个请求的状态会变成canceled
    if (!err.response) {
      Message({
        type: 'error',
        message: '请求超时',
        showClose: true
      });
      console.log('请求超时或跨域');
      console.log(err.response);
      return Promise.reject(err);
    }
    // 这里是通用提示
    var messageStr = err.response.data.message;
    // console.log(Message);
    switch (err.response.status) {
      case 400:
        showMessage({
          hiddenMessage: err.config.hiddenMessage,
          message: messageStr || '请求失败 400'
        });
        break;
      case 401: // 401 token过期后进行无感刷新token
        showMessage({
          hiddenMessage: err.config.hiddenMessage,
          message: messageStr || '身份校验失败 401'
        });
        break;
      case 403:
        showMessage({
          hiddenMessage: err.config.hiddenMessage,
          message: messageStr || '禁止访问 403'
        });
        break;
      case 404:
        showMessage({
          hiddenMessage: err.config.hiddenMessage,
          message: messageStr || '数据未找到 404'
        });
        break;
      case 405:
        showMessage({
          hiddenMessage: err.config.hiddenMessage,
          message: messageStr || '不支持请求的方法 405'
        });
        break;
      case 415:
        showMessage({
          hiddenMessage: err.config.hiddenMessage,
          message: messageStr || '不支持的媒体类型 415'
        });
        break;
      case 500:
        showMessage({
          hiddenMessage: err.config.hiddenMessage,
          message: messageStr || '后端服务异常 500'
        });
        break;
    }
    // 实测这里必须触发Promise.reject, 把错误继续向下抛出
    // 然后比如axios.get('/', success, fail)的fail函数才能被触发并接收到这里抛出的错误
    return Promise.reject(err.response);
  }
);


export default instance // 发送请求, 发送请求会触发前置拦截器, 前置拦截器中会自动使用上面计算出来的后端地址
