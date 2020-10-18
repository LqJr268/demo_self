// 列表页mixin
// 如果一个页面: 有tab, 有内容, 有搜索, 有分页. 比如套系管理, 文章管理
// 那么可以引入这里的这个mixin, 复用该mixin中的逻辑
export default {
  data () {
    return {
      currnetPage: 1, // 当前页
      searchText: '', // 搜索文本
      loadingClass: '' // loading区域, 空字符串代表全局loading
    }
  },
  // 你的具体页面需要包含如下两个方法
  // apiGetList() 获取列表
  // apiGetCount() 获取数量
  // 下面会调用
  methods: {
    // tab改变
    async changeTab (el) {
      this.currnetPage = 1
      this.$openLoading(this.loadingClass)
      await this.apiGetList()
      this.$closeLoading(this.loadingClass)
    },

    // 分页改变
    async pageChange (val) {
      this.$openLoading(this.loadingClass)
      await this.apiGetList()
      this.$closeLoading(this.loadingClass)
    },

    // 搜索
    async search () {
      this.currnetPage = 1
      this.$openLoading(this.loadingClass)
      await this.apiGetCount()
      await this.apiGetList()
      this.$closeLoading(this.loadingClass)
    }

  },
  async mounted () {
    this.$openLoading(this.loadingClass)
    await this.apiGetCount()
    await this.apiGetList()
    this.$closeLoading(this.loadingClass)
  }
}
