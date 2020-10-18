module.exports = {
    devServer: {
      proxy: {
      //******proxy配置项 通知webpack另起一个代理服务器 所以只有具有webpack工具的本地环境能够生效
        "/lwyReception": {// "/lwyReception"： 有了代理服务器配置后 浏览器发出的请求会访问代理服务器 代理服务器可能取消了同源限制 然后以服务器的身份向真实服务器访问（服务器间无同源策略） 这里接收以/lwyReception开头的请求并转发给真实服务器。
          // 真正访问的地址：target+axios请求的值
          target: "http://127.0.0.1:88",// 目标服务器的域名和端口号：通过该代理转发访问的真实服务器（本地demo利用node.js写的服务端口部署在88 详见api--server.js）。
          changeOrigin: true,// 是否开启代理
          pathRewrite: {// 重写你的地址
            "^/lwyReception": ""
          }
        }
      }
    }
  }
  //vue.config.js   vue环境下的webpack.config.js  vue环境下的配置文件
  