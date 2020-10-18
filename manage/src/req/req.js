import axios from 'axios'
import qs from 'qs'
// qs.parse()将URL解析成对象的形式
// qs.stringify()将对象整理成url
// 引入node.js中的qs模块
// ------FormData形式的数据

// qs.stringify(data): Form Data的形式
// 不做字符串化处理时  为 payload 的形式

// axios默认可修改Cookie
axios.defaults.withCredentials = true

// 添加token请求头
axios.interceptors.request.use(function (config) {
  if (window.sessionStorage.getItem('access_token')) {
    config.headers.Authorization = 'Bearer ' + '' // 将token放到请求头发送给服务器
    return config
  } else {
    return config
  }
}, function (error) {
  return Promise.reject(error)
})

// 根据域名，确定接口地址
var apiaddress

if (window.location.hostname === '') {
  apiaddress = ''
} else {
  apiaddress = ''
}

const api = {
  // 套系
  series: {

  },
  // 通用
  common: {
    getUptoken: 'Storage.Token', //  七牛上传图片获取上传令牌 接口：存储 获取上传令牌
  }

}

//  七牛上传图片获取上传令牌 接口：存储 获取上传令牌
const getUptoken = () => {
  return new Promise((resolve, reject) => {
    let data = {
      api: api.common.getUptoken
    }
    axios.post(apiaddress, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res.response)
    })
  })
}

export default {
  // 通用
  common: {
    getUptoken: getUptoken //  七牛上传图片获取上传令牌 接口：存储 获取上传令牌

  },
  // 套系
  series: {

  }
}
