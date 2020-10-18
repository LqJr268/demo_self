import cities from '@/assets/lib/location.json'
import Vue from 'vue'


/**
 * 回到页面顶部
 */
export function gotoTop () {
  console.log("回顶部")
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

/**
 * 传入地址id, 获取地址名字
 * @param {Array} ids 地区id数组
 * @param {string} joinstr, 连接字符串
 * @return {Array | string} 如果传入了连接字符串, 则返回一个拼装好的地址字符串
 * 否则返回一个地址数组
 */
let idLocMap = null
export function getLocFromId (ids, joinstr) {
  // console.log(getLocFromId([10396]))[ '中国澳门' ]
  // console.log(getLocFromId([10396,10009,10010]))[ '中国', '河北', '石家庄' ]
  // console.log(getLocFromId([10397, 10398, 10401]))[ '中国台湾', null, '新竹县' ]
  // 生成map
  if (!idLocMap) {
    idLocMap = {}
    for (const country of cities) {
      idLocMap[country.Id] = country.Cn
      if (country.Provinces) {
        for (const province of country.Provinces) {
          idLocMap[province.Id] = province.Cn
          if (province.Cities) {
            for (const city of province.Cities) {
              if (idLocMap[city.Id]) {
                console.error('国家/省/市存在重复id')
              }
              idLocMap[city.Id] = city.Cn
            }
          }
        }
      }
    }
  }

  // 查询地址
  let res = []
  for (const i of ids) {
    res.push(idLocMap[i])
  }

  if (joinstr) res = res.filter(item => item).join(joinstr)
  return res
}
