import axios from 'axios'
import qs from 'qs'

//** */ 获取套系列表
const getType = () => {
  // console.log("获取类别列表")
  return new Promise((resolve, reject) => {
    axios.post('/lwyReception/Type.All', {
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

//** */ 获取商品
const getGoods = (pageIndex, pageSize, typeName) => {
  return new Promise((resolve, reject) => {
    let data = {
      fields: 'Id,Name,CreatedAt,AreaName,PhotographyCategory,Cover,Price,Delisting,CoverHeight,CoverWidth',
      typeName,
      pageIndex,
      pageSize,
      delisting: false
    }
    axios.post('/lwyReception/Series.All', qs.stringify(data), {
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

//** */ 获取单个商品
const getGoodsDetail = (id) => {
  return new Promise((resolve, reject) => {
    let data = {
      fields: 'Description,Id',
      id
    }
    axios.post('/lwyReception/Series.Get', qs.stringify(data), {
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
  getType,
  getGoods,
  getGoodsDetail
}