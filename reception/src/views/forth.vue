<template>
  <div>
    <div style="transition:all 2s linear" v-if="ifLoadMob">
      <img width="100%" height="100%" src="@/assets/img/mob.png" alt />
    </div>
    <div style="transition:all 2s linear" v-if="ifLoadPc">
      <img width="100%" height="100%" src="@/assets/img/pc.png" alt />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ifLoadMob: false,
      ifLoadPc: false,

      screenWidth: document.body.clientWidth //初值
    };
  },
  methods: {
    browserRedirect() {
      //区分PC与移动
      var sUserAgent = navigator.userAgent.toLowerCase(); //navigator.userAgent属性返回浏览器的User-Agent字符串，标示浏览器的厂商和版本信息
      //不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且无法保证未来的适用性，更何况各种上网设备层出不穷，难以穷尽。所以，现在一般不再识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的JavaScript功能。
      if (
        /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(
          sUserAgent
        )
      ) {
        //跳转移动端页面
        //  window.location.href="http://www.baidu.com";
        this.ifLoadMob = true;
        this.ifLoadPc = false;
      } else {
        //跳转pc端页面
        //  window.location.href="https://www.aiyaopai.com";
        this.ifLoadPc = true;
        this.ifLoadMob = false;
      }
    }
  },
  watch: {
    screenWidth(val) {
      console.log(val);
      this.screenWidth = val;

      let _this = this;
      if (this.screenWidth >= 1080) {
        this.ifLoadPc = true;
        this.ifLoadMob = false;
      } else if (this.screenWidth <= 1080) {
        //PC页面较小时也展示移动界面
        this.ifLoadMob = true;
        this.ifLoadPc = false;
      }
    }
  },

  created() {
    this.browserRedirect();
  },
  beforeMount() {

    //页面大小变化 提升响应速度 越早越好 在实例挂载之前
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
  }

};
</script>
<style lang="less">

</style>
