<template>
  <!-- 顶栏 -->
  <div class="top-bar">
    <!-- logo -->
    <div class="logo" @click="toPath('/')">
      <!-- <img src="@/assets/img/logo.png" /> -->
      LogoArea
    </div>

    <div class="blank"></div>

    <!-- menus -->
    <el-menu class="top-bar-menu" mode="horizontal" :default-active="curPath" router>
      <el-menu-item
        v-for="item of topNav"
        :key="item.path"
        :index="item.path"
        class="top-bar-menu-item"
      >{{ item.meta.name}}</el-menu-item>
      <!-- 设置route={}空对象, 可以防止点击这个item被点击时发生跳转 -->
      <el-menu-item
        class="top-bar-menu-item phone-number"
        index="phone-number"
        :route="{}"
      >400-021-0916</el-menu-item>
      <!-- 这个写死了绑定到/help路径 -->
      <el-menu-item index="/help" class="top-bar-menu-item">帮助</el-menu-item>
      <!-- 头像 & 下拉框 -->
      <el-submenu
        :popper-append-to-body="false"
        class="avatar-and-user-info"
        index="avatar-and-user-info"
      >
        <template slot="title">
          <el-avatar :src="userData.avatar"></el-avatar>
        </template>
        <!-- 下拉列表 -->
        <el-menu-item class="underline user" index="user-info" :route="{}">
          <div class="user-avatar">
            <el-avatar :src="userData.avatar"></el-avatar>
          </div>
          <div class="user-name">{{userData.name}}</div>
        </el-menu-item>
        <el-menu-item index="/editProfile">编辑资料</el-menu-item>
        <el-menu-item index="/changePassword" class="underline">修改密码</el-menu-item>
        <el-menu-item index="exit" :route="{}" @click="exit">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// mapMutations
import { mapState } from "vuex";
import { resetRouter } from "@/router";

export default {
  name: "topBar",
  data() {
    return {
      userData: {
        name: "",
        avatar: "",
        phone: "",
      },
    };
  },
  computed: {
    ...mapState("topNav", {
      // 从store中获取顶栏信息
      topNav: (state) => state.topNav,
    }),
    // 根据路由, 计算当前激活的路径
    curPath() {
      let res = "non-exist-path";
      // 当位于当前路径, 当前路径的子路径时, 都将curPath设置为"当前路径", 以激活当前tab的高亮
      // console.log("top--权限表&当前路径", this.topNav, this.$route.path);
      for (const t of this.topNav) {
        if (
          t.path === this.$route.path ||
          (Array.isArray(t.meta.childrenPath) &&
            t.meta.childrenPath.includes(this.$route.path))
        ) {
          // if (
          //   this.$route.path.indexOf(t.path) !== -1 ||
          //   (Array.isArray(t.meta.childrenPath) &&
          //     t.meta.childrenPath.includes(this.$route.path))
          // ) {//******全路径模式检测 */
          res = t.path;
          break;
        }
      }
      return res;
    },
  },
  mounted() {},
  methods: {
    exit() {
      sessionStorage.clear();
      resetRouter();
      this.$router.push({ path: "/Login" });
    },
    toPath() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang="less" scoped>
// 变量
@topBarHeight: 55px;

// top bar
.top-bar {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  width: 100%;
  // min-width: 672px;
  height: @topBarHeight;
  box-sizing: border-box;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid #dfdfdf;
  z-index: 1999; // 要比第二个顶栏(相册信息栏)的index高, 防止头像弹窗被第二个顶栏遮住. 同时要比loading高, 防止被loading挡住. 同时要比模态框低, 防止挡住模态框
}

// logo
.logo {
  width: 236px;
  height: 20px;
  margin-left: 27px;
  flex-shrink: 0;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}

.blank {
  flex: 1;
}

// 顶部菜单
/deep/ .top-bar-menu {
  height: @topBarHeight;
  margin-right: 23px;
  display: flex;
  flex-wrap: nowrap;
  .top-bar-menu-item {
    height: @topBarHeight;
    line-height: @topBarHeight + 5px;
    margin: 0 15px;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
    color: #8e8e8e;
    border-bottom: 5px solid #303a48;
    &.is-active {
      border-bottom: 5px solid #303a48;
      color: rgba(48, 58, 72, 1);
    }
  }
  .phone-number {
    cursor: default;
  }
}
// 头像 & 弹出框
.avatar-and-user-info {
  margin-right: 10px;
  margin-left: 23px;
  // 头像
  /deep/ .el-submenu__title {
    padding: 0;
    margin: 0;
    height: @topBarHeight!important;
    line-height: @topBarHeight!important;
    border: none !important;
  }
  /deep/ .el-submenu__title:hover {
    background: transparent !important;
  }
  /deep/ .el-submenu__icon-arrow::before {
    content: none;
  }
  // 下拉列表
  /deep/ .el-menu--popup {
    border: 1px solid rgba(223, 223, 223, 1);
    padding: 0;
    li {
      height: auto;
      padding: 0px 20px;
    }
    li:hover {
      background: #eee;
    }
  }
  // 用户信息
  .el-menu-item.user {
    display: flex;
    height: 56px;
    align-items: center;
    cursor: default;
    .user-avatar {
      height: 40px;
      width: 40px;
      margin-right: 10px;
    }
    .el-avatar {
      height: 100%;
      width: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      font-size: 13px;
      font-weight: 600;
      color: rgba(48, 58, 72, 1);
    }
  }

  // 账户
  .account {
    display: flex;
    flex-direction: column;
    height: 60px;
    cursor: default;
  }
  .first-line {
    display: flex;
    .balance {
      font-size: 13px;
      color: rgba(142, 142, 142, 1);
      font-weight: 400;
      flex-grow: 1;
    }
    .top-up {
      font-size: 13px;
      color: rgba(48, 58, 72, 1);
      font-weight: 400;
      flex-shrink: 0;
      cursor: pointer;
    }
  }
  .second-line {
    line-height: 16px;
    font-size: 16px;
    color: rgba(48, 58, 72, 1);
    font-weight: 600;
    flex-shrink: 0;
  }
  // 公有
  .underline {
    border-bottom: 1px solid #e2e2e2;
  }
}
</style>
