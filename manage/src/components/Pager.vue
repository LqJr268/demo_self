<template>
  <div class="pager">
    <el-pagination
      background
      layout="prev, pager, next"
      class="pager"
      :page-size="pageSize"
      :total="total"
      :current-page="currentPage"
      @update:currentPage="val => $emit('update:currentPage', val)"
      @current-change="val => $emit('current-change', val)"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'pager',
  props: {
    // 每页多少个
    pageSize: {
      type: Number,
      default: 5
    },
    // 总条目数
    total: {
      type: Number,
      default: 0
    },
    // 当前页, 支持.sync
    currentPage: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    console.log("分页信息",this.pageSize,this.total)
  }
}
</script>
<style lang="less" scoped>
 // 分页
.pager {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
</style>
