<template>
  <div id="app">
    <!-- 隐藏组件 滚动条 -->
    <el-scrollbar tag="section" wrap-class="el-overx-hidden" class="scroll-bar">

      <div class="scroll-x">
        <top-bar v-if="showTopBar"></top-bar>
        <div style="display:flex;">
          <side-bar v-if="showSideBar"></side-bar>

          <keep-alive>
            <!--使用keep-alive会将页面缓存-->
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>

        </div>
      </div>

    </el-scrollbar>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import topBar from "@/components/topBar";
import sideBar from "@/components/sideBar";
export default {
  name: "App",
  components: {
    topBar,
    sideBar,
  },
  data() {
    return {
      showTopBar: false,
      showSideBar: false,
      sideData: [],
    };
  },
  watch: {
    $route: {
      // immediate: true,//由于/处的重定向  不需要第一次触发声明
      deep: true,
      handler(newVal) {
        // console.log(newVal, "APP");
        this.showTopBar = newVal.meta.needTop;

        // this.showSideBar = false;
        // this.showSideBar = newVal.meta.needSide;

        this.showSideBar = false;
        this.$nextTick(() => {//将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。
          this.showSideBar = newVal.meta.needSide;
        });

        if (newVal.path !== "/Login") {
          let res = 0;
          for (const t of this.$store.state.topNav.topNav) {
            if (
              Array.isArray(t.meta.childrenPath) &&
              t.meta.childrenPath.includes(newVal.path)
            ) {
              break;
            } else {
              res++;
            }
          }
          //监测 找到子路由路径匹配当前 $route 路径的顶栏项目 取出其子路径进行侧栏数据渲染
          // console.log(this.$store.state.topNav.topNav[res]);
          if (
            this.$store.state.topNav.topNav[res] !== undefined &&
            this.$store.state.topNav.topNav[res].children.length > 0
          ) {
            this.sideData = this.$store.state.topNav.topNav[res].children;
            this.getSideNav(this.sideData);
          }
        }
      },
    },
  },
  created() {},
  methods: {
    ...mapActions({
      //vuex存值的一种方式 mapActions
      getSideNav: "sideNav/getNav",
    }),
  },
};
</script>
<style>
html,
body {
  width: 100%;
  height: 100%;
}
</style>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  .scroll-x {
    min-width: 1280px;
    // margin: 0 auto;
  }
  .el-overx-hidden {
    overflow-x: hidden;
  }
  .el-scrollbar__bar.is-horizontal {
    z-index: 9999;
  }
}
</style>
