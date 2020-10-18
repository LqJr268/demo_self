<template>
  <div class="side-box" :class="isHover ? 'animation-side-box' : '' ">
    <el-scrollbar
      tag="section"
      wrap-class="el-overx-hidden"
      class="nav-scroll-bar"
      :class="isHover ? 'hove-side-bar' : ''"
      :style="{'top' : dbTop ? '110px' : '55px'}"
    >
      <div class="side-bar">
        <el-menu
          :default-active="getRouter"
          :router="true"
          :collapse="isHover"
          class="el-menu-vertical"
          background-color="#F7F7F7"
          text-color="#8E8E8E"
          active-text-color="#363A3F"
          @open="handleOpen"
          @close="handleClose"
        >
          <template v-for="(item, index) in sideNav">
            <!-- <template v-if="item.children.length">
              <el-submenu :key="index" :index="`${index + 1}`">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item
                  v-for="(itemChild, indexChild) in item.children"
                  :key="indexChild"
                  :index="itemChild.path"
                  :route="{path: itemChild.path, query: field}">
                  {{itemChild.name}}
                </el-menu-item>
              </el-submenu>
            </template>-->
            <!-- <template v-else> -->
            <el-menu-item :key="index" :index="item.path" :route="{path: item.path, query: field}">
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
            <!-- </template> -->
          </template>
        </el-menu>
        <div class="side-fixed" :class="isHover ? 'animation-btn' : '' " @click="fixedBar">
          <div v-show="!isHover">
            <p class="fly-photo">Flyphoto</p>
            <div class="fixed-btn">
              <i class="icon el-icon-unlock"></i>
              <span>取消固定</span>
            </div>
          </div>
          <el-tooltip class="item" effect="dark" content="固定此栏" placement="top">
            <div v-show="isHover" class="unlock-box">
              <i class="el-icon-lock"></i>
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
/**
 * fileName: 侧边导航
 * auth:
 * createdTime:
 * @prop {Boolean} dbTop 双倍topbar 距离
 * @prop {Array} sideData 导航数据
 * @prop {Object} field 路由跳转时携带参数, kay:value
 *
 * @edit time:
 * @events setLoaction 监听页面宽度，处理是否sideBar 缩进问题
 * @events setHoverSync 一个简答的防抖函数，避免页面宽度过快变化造成卡顿，和性能浪费
 */
import { mapState } from "vuex";

export default {
  name: "sideBar",
  props: {
    dbTop: {
      default: false,
    },
    field: {
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      pageEvent: null,
      barWidth: 0,
      timer: null,
      timeSwich: false,
      isHover: false, // 是否折叠

      // getRouter: "",
    };
  },
  computed: {
    //******计算成员值动态变动
    ...mapState("sideNav", {
      // 从store中获取侧栏信息
      sideNav: (state) => state.sideNav,
    }),
    getRouter() {
      let res = "non-exist-path";
      // console.log("side--权限表&当前路径", this.sideNav, this.$route.path);
      // console.log(this.$parent);
      for (const t of this.sideNav) {
        if (t.path === this.$route.path) {
          res = t.path;
          break;
        }
      }
      // this.sideNav.map((item) => {
      //   if (item.path === this.$route.path) {
      //     res = item.path;
      //   }
      // });
      // console.log("getRouter", res);
      return res;
    },
  },
  // watch: {
  //   $route: {
  //     immediate: true,
  //     deep: true,
  //     handler(newVal) {
  //       console.log(newVal, this.sideNav);
  //       for (const t of this.sideNav) {
  //         if (t.path === newVal.path) {
  //           this.getRouter = t.path;
  //           // console.log(this.getRouter);
  //           break;
  //         }
  //       }
  //     },
  //   },
  // },
  created() {
    this.setLoaction();
  },
  methods: {
    // 固定导航栏
    fixedBar() {
      this.isHover = !this.isHover;
      //   this.editHover(this.isHover);
    },
    // 监听页面宽度
    setLoaction() {
      this.barWidth =
        (document.documentElement.clientWidth || document.body.clientWidth) -
        110;
      this.isHover = this.barWidth < 1190;
      //   this.editHover(this.isHover);
      // console.log(this.isHover);
      this.pageEvent = window.onresize = () => {
        this.barWidth =
          (document.documentElement.clientWidth || document.body.clientWidth) -
          110;
        this.setHoverSync();
      };
    },
    // 做一个简单的节流函数
    setHoverSync() {
      // console.log(this.barWidth);
      if (!this.timeSwich) {
        this.timeSwich = true;
        this.timer = setTimeout(() => {
          this.isHover = this.barWidth < 1190;
          //   this.editHover(this.isHover);
          this.timeSwich = false;
          clearTimeout(this.timer);
        }, 500);
      } else {
        clearTimeout(this.timer);
        this.timeSwich = false;
        this.setHoverSync();
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.side-box {
  width: 200px;
  transition: width 0.55s;
  flex-shrink: 0;
  .nav-scroll-bar {
    position: fixed;
    bottom: 0;
    padding-top: 14px;
    border-right: solid 1px #e6e6e6;
    z-index: 1999;
    .side-bar {
      // width: 225px;
      height: 100%;
      .el-menu-vertical {
        position: relative;
        padding-bottom: 170px;
        border-right: none;
        // height: 100%;
        /deep/.el-menu-item.is-active {
          background-color: rgba(198, 198, 198, 0.3) !important;
        }
        .el-menu-item.is-active,
        .el-submenu__title * {
          font-weight: bolder;
        }
        &:not(.el-menu--collapse) {
          width: 200px;
        }
      }
      .side-fixed {
        position: fixed;
        left: 0;
        // right: 0;
        bottom: 0;
        width: 200px;
        // height: 100px;
        transition: width 0.5s;
        .fly-photo {
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: rgba(229, 229, 229, 1);
          background-color: #f7f7f7;
        }
        .fixed-btn {
          // padding: 15px 0;
          // display: flex;
          // align-items: center;
          height: 48px;
          font-size: 13px;
          font-weight: 400;
          color: rgba(111, 119, 131, 1);
          line-height: 48px;
          text-align: center;
          background-color: #f7f8fa;
          border-top: 2px solid #dfdfdf;
          cursor: pointer;
          .icon {
            margin-right: 5px;
          }
        }
        .unlock-box {
          // border-top: 2px solid #DFDFDF;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .el-icon-unlock {
            line-height: 48px;
          }
        }
        &.animation-btn {
          width: 64px;
        }
      }
    }
  }
  &.animation-side-box {
    width: 64px;
    transition: width 0.35s;
  }
}
</style>
