import axios from '@/utils/request';

// console.log("请求封装", axios)

function login(req) {
  // console.log("req", req)
  return axios({
    method: 'POST',
    url: '/login',
    headers: {
      'Content-Type': 'application/json'
    },
    data: req
  });
}
export default login

