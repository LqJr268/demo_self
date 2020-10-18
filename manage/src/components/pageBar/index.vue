<template>
  <div ref="page-bar" :class="{'page-bar': true, 'fixed': layout === 'fixed'}">
    <el-pagination
      class="common-pagination"
      background
      layout="total, prev, pager, next, sizes"
      :total="total"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="currentPageChange"
      @current-change="currentChange"
      @size-change="sizeChange"
    ></el-pagination>
    <!--  :current-page="currentPage" -->
  </div>
</template>
<script>
/**
 * 底部分页
 * @author
 * @prop {String} layout 布局方式, 可取值 "fixed" 固定在页面底部(默认) || "normal" 非固定布局, 正常流
 * @prop {Number} total 总条数
 * @prop {Number} current-page 当前页, 支持.sync修饰符
 * @prop {Number} page-size 分页条数, 支持.sync修饰符
 * @prop {Array} page-sizes 分页条数选项
 * @prop {Number} move-left 设定分页组件要向左偏移多少px. 用于某些情况下调整分页组件的左对齐 如: 23
 * @emit current-change 当前页变化时触发
 * @emit size-change 分页条数发生变化时触发
 *
 * @example
 * <page-bar
    layout="normal"
    :total="total"
    :current-page.sync="defaultPage"
    :page-size.sync="defaultPageSize"
    :page-sizes="defaultPageSizes"
    @size-change="handlePageSizeChange"
    @current-change="handleCurrentChange"
  ></page-bar>
 */

export default {
  name: "submitBar",
  props: {
    layout: {
      type: String,
      default: "fixed",
    },
    total: {
      type: Number,
      default: 0,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    pageSize: {
      type: Number,
      required: true,
    },
    pageSizes: {
      type: Array,
      required: true,
    },
    moveLeft: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      resizeHandler: null,
      currentPageChange: 1,
    };
  },
  methods: {
    currentChange(val) {
      // console.log(val);//当前页码
      this.$emit("current-change", val);
    },
    sizeChange(val) {
      // console.log(val);//分页大小
      this.$emit("size-change", val);
      this.currentPageChange = 1;
    },
  },
  mounted() {
    // 如果是fixed布局, 则需要hack page-bar的位置
    if (this.layout === "fixed") {
      // 首先: 设置pagebar的top = 页面高度 - pagebar的高度. 并添加页面高度变化的监听
      const pageBarHeight = 49;
      const el = this.$refs["page-bar"];
      el.style.top =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) -
        pageBarHeight +
        "px"; // 距离顶部的距离
      let timer = null;
      this.resizeHandler = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          el.style.top =
            (window.innerHeight ||
              document.documentElement.clientHeight ||
              document.body.clientHeight) -
            pageBarHeight +
            "px"; // 距离顶部的距离
        }, 100);
      };
      window.addEventListener("resize", this.resizeHandler);
      // 然后: 如果page-bar的父元素还有左padding, 则page-bar还需要一个负margin来抵消父元素的左padding
      // 或者如果外部传进来一个moveLeft参数, 则使用moveLeft参数来设置负的margin值
      if (this.moveLeft) {
        el.style.marginLeft = "-" + this.moveLeft + "px";
      } else {
        el.style.marginLeft =
          "-" + window.getComputedStyle(el.parentNode).paddingLeft;
      }
    }
  },
  beforeDestroy() {
    // 组件销毁前记得移除resize监听
    window.removeEventListener("resize", this.resizeHandler);
  },
};
</script>
<style lang="less" scoped>
// fixed布局
.page-bar.fixed {
  display: flex;
  position: fixed;
  width: 100%; // 这个100%是相对于父元素的
  height: 49px;
  box-sizing: border-box;
  align-items: center;
  z-index: 10;
  background: #fff;
  border-top: 1px solid rgb(220, 223, 230);
  .el-pagination {
    margin-left: 20px;
  }
}
</style>
