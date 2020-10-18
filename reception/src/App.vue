<template>
  <div id="app" :style="{marginTop:showTopBar?'60px':'0px'}">
    <top-bar v-if="showTopBar"></top-bar>
    <keep-alive>
      <!--使用keep-alive会将页面缓存-->
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <bottom-bar v-if="showBottomBar"></bottom-bar>
  </div>
</template>

<script>
import topBar from "@/components/topBar";
import bottomBar from "@/components/bottomBar";
export default {
  name: 'App',
  components: {
    topBar,
    bottomBar,
  },
  data() {
    return {
      showTopBar: false,
      showBottomBar: false,
    }
  },
  watch: {
    $route: {
      // immediate: true,//由于/处的重定向  不需要第一次触发声明
      deep: true,
      handler(newVal) {
        // console.log(newVal, "APP");
        this.showTopBar = newVal.meta.needTop;
        this.showBottomBar = newVal.meta.needBottom;
      },
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
