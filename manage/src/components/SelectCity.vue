<template>
  <!-- 设置默认值不回显的解决方案 https://segmentfault.com/q/1010000020060147 -->
  <div class="select-city">
    <el-cascader
      :value="value"
      clearable
      :options="cityOptions"
      :placeholder="placeholder"
      :style="{width}"
      :props="cascaderProps"
      @input="handleChange"
      filterable
    ></el-cascader>
  </div>
</template>
<script>
/**
 * 选择城市
 * @date 2020-5-13
 * @author
 * @prop {Array} value 必须. 选中的值, 双向数据绑定父组件需要使用v-model进行传入 ******有初始数据时的值决定value******
 * 如<select-city v-model="formInfo.city"></select-city>
 * @prop {string} placeholder 可选, 默认'省/市'
 * @prop {boolean} isAnyLevel 是否可以选中任意一级
 * @example <select-city v-model="formInfo.city"></select-city>
 */
import cities from '@/assets/lib/location.json'

export default {
  name: 'selectCity',
  props: {
    placeholder: {
      default: '省/市'
    },
    value: {
      required: true
    },
    width: {
      type: [String]
    },
    isAnyLevel: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      timer: null,
      cityOptions: [],
      cascaderProps: {}
    }
  },
  methods: {
    handleChange (msg) {
      this.$emit('input', msg)
    },
    // 对location中的数据结构进行改造
    // 改变字段名, 并移除空children
    removeEmptyChildren (data) {
      for (const d of data) {
        if (d.Id) d.value = d.Id//value决定选项“id”
        if (d.Cn) d.label = d.Cn//laber决定展示内容
        if (d.Provinces) d.children = d.Provinces
        else if (d.Cities) d.children = d.Cities
        if (d.children && d.children.length === 0) {
          delete d.children
        } else if (d.children) {
          this.removeEmptyChildren(d.children)
        }
      }
    }
  },
  created () {
    /**
     * 对于我们cities中的数据, 如果children属性=[]空数组, element渲染时会渲染出来一个多余的可展开按钮
     * 展开后会显示无内容
     * 这里移除空的children属性, 以杜绝这种效果
     * @todo 如果cascader出现性能问题, 可以**尝试**在这里通过动态修改cityOptions对象实现懒加载
     * 但最好不要使用官方的lazyload, 因为启用lazyload之后, 无法解决默认值回显问题
     * @see https://element.eleme.cn/#/zh-CN/component/cascader
     * 比如传进来默认选中的是[中国, 河南, 郑州], 因为现在页面数据现在是懒加载, 只能加载出第一列的信息: 中国/美国/英国....
     * 无法加载出第二列, 第三列的信息, 导致无法进行默认选中
     */
    this.removeEmptyChildren(cities)
    this.cityOptions = cities
    if (this.isAnyLevel) this.cascaderProps.checkStrictly = true
  }
}
</script>
<style lang="less" scoped>
</style>
