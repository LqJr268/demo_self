// 适用于element的form组件的校验器

/**
 * 校验: 非空数组
 * @param {string} errMsg 校验失败的错误信息
 * @example validator: NonEmptyArray()
 */
export const nonEmptyArray = errMsg => (rule, value, cb) => {
  if (!value || value.length === 0) {
    cb(new Error(errMsg))
  } else {
    cb()
  }
}

/**
 * 校验: 整数或小数字符串
 * @param {string} errMsg 校验失败的错误信息
 * @param {number} decimalNum 最多保留几位小数
 */
export const numberOrDecimalStr = (errMsg, decimalNum = 0) => (rule, value, cb) => {
  const reg = new RegExp(`^\\d+(\\.\\d{0,${decimalNum}})?$`)
  if (!reg.test(value)) {
    cb(new Error(errMsg))
  } else {
    cb()
  }
}

/**
 * 校验: 是个图片数组(适用于套系)
 * @param {string} errMsg 校验失败的错误信息
 */
export const seriesImgArr = errMsg => (rule, value, cb) => {
  if (!value || value.length === 0 || !value[0] || !value[0].url) {
    cb(new Error(errMsg))
  } else {
    cb()
  }
}

/**
 * 校验: 是个电话号码
 */
export const phoneNumberValidator = (rule, value, cb) => {
  if (!value) {
    cb(new Error('请输入手机号'))
  } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(value)) {
    cb(new Error('无效的手机号'))
  } else {
    cb()
  }
}
