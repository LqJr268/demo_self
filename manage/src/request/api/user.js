import axios from '@/utils/request';

// console.log("请求封装", axios)

// 风格1 -- 定义
// function getList(req) {
//   // console.log("req", req)
//   return axios({
//     method: 'POST',
//     url: '/list',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: req
//   });
// }

// 风格1 -- 调用
// let req = {...}
// user.getList(req)
//   .then((res) => {
//     if (res.data.ok === 1) {
//       console.log(res.data);
//       this.totalPage = res.data.totalPageSize;
//       this.totalNum = res.data.totalNum;
//       this.tabList = res.data.list;
//       this.pageIndex = 1;
//     } else {
//       console.log(res.data);
//     }
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// 风格2 -- 定义
function getList(req, cb, errCb) {
  return new Promise((resolve, reject) => {

    // console.log("参数", req)
    axios.post('/list',req)
      .then((rep) => resolve(cb(rep)))
      .catch((error) => reject(errCb(error)))

  })

}

// 风格2 -- 调用
// let req = {...}
// getList(
//   req,
//   (res) => {
//     //闭包？？
//     if (res.data.ok === 1) {
//       console.log(res.data);
//       this.totalPage = res.data.totalPageSize;
//       this.totalNum = res.data.totalNum;
//       this.tabList = res.data.list;
//       this.pageIndex = 1;
//     } else {
//       console.log(res.data);
//     }
//   },
//   (err) => {
//     console.error(err);
//   }
// );

//***************************** */
function updateSecondaryIdentity(req, cb, errCb) {
  return new Promise((resolve, reject) => {

    // console.log("参数", req)
    axios.post('/updataSecondaryIdentity',req)
      .then((rep) => resolve(cb(rep)))
      .catch((error) => reject(errCb(error)))

  })
}

export default { getList, updateSecondaryIdentity }

