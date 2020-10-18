import axios from '@/utils/request';
import qs from 'qs'
// qs.parse()将URL解析成对象的形式
// qs.stringify()将对象整理成url
// 引入node.js中的qs模块
// ------FormData形式的数据

// qs.stringify(data): Form Data的形式
// 不做字符串化处理时  为 payload 的形式

const api = {
  // 商品
  series: {
    getSeriesList: 'Series.All', // 获取商品列表,
    getOneSeries: 'Series.Get', // 获取单个商品
    createSeries: 'Series.Insert', // 添加商品,
    updateSeries: 'Series.Update', // 更新商品
    disableSeries: 'Series.Delisting', // 下架商品
    enableSeries: 'Series.Delisting' // 上架商品
  }
}

/******** 商品 ********/

//** 获取商品列表
const getSeriesList = ({pageIndex, pageSize, sellerId, key, delisting}) => {
  return new Promise((resolve, reject) => {
    let data = {
      // api: api.series.getSeriesList,
      fields: 'Id,Name,CreatedAt,AreaName,PhotographyCategory,Cover,Price,Delisting',
      sellerId,
      pageIndex,
      pageSize,
    }
    if (key) data.key = key
    if (typeof delisting === 'boolean') data.delisting = delisting
    axios.post('/Series.All', qs.stringify(data), {
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

// 获取单个商品
const getOneSeries = (id) => {
  return new Promise((resolve, reject) => {
    let data = {
      // api: api.series.getOneSeries,
      id,
      fields: 'Name,Cover,CoverHeight,CoverWidth,PhotographyCategory,ShootGroupsCount,CountryId,ProvinceId,CityId,Price,DepositAmount,OriginalPicturesCount,RefinedPicturesCount,MakeupsCount,ClothesCount,ShootCounts,AdvanceBookingDays,ServiceDuration,DeliveryDays,ServiceCities,ShootScene,Product,DedicatedService,ShootEquipment,ValueAddedServices,ShootDescription,Description,OtherFeature,SamplesShow,Style'
    }
    axios.post('Series.Get', data).then(res => {
      resolve(res)
    }).catch(res => {
      reject(res.response)
    })
  })
}

// 添加商品
const createSeries = (query) => {
  return new Promise((resolve, reject) => {
    const data = {
      // api: api.series.createSeries,
      ...query,
      needToken: true
    }
    axios.post('Series.Insert', qs.stringify(data), {
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

// 更新商品
const updateSeries = (query) => {
  return new Promise((resolve, reject) => {
    const data = {
      // api: api.series.updateSeries,
      ...query,
      needToken: true
    }
    axios.post('Series.Update', qs.stringify(data), {
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

// 上架商品
const enableSeries = (id) => {
  return new Promise((resolve, reject) => {
    // console.log("商品上架")
    const data = {
      // api: api.series.enableSeries,
      id,
      delisting: false,
      needToken: true
    }
    axios.post('Series.Delisting', qs.stringify(data), {
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

// 下架商品
const disableSeries = (id) => {
  return new Promise((resolve, reject) => {
    // console.log("商品下架")
    const data = {
      // api: api.series.disableSeries,
      id,
      delisting: true,
      needToken: true
    }
    axios.post('Series.Delisting', qs.stringify(data), {
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
  // 商品
  series: {
    getSeriesList, // 获取商品列表
    getOneSeries, // 获取单个商品
    createSeries, // 添加商品
    updateSeries, // 更新商品
    enableSeries, // 上架商品
    disableSeries // 下架商品
  }
}
