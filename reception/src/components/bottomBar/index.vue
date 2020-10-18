<template>
  <!-- 底栏 -->
  <div class="bottom-bar">
    <div class="bottom-tab" @click="go('/')">
      <div class="iconfont icon-biaoqianA01_shouye-36"></div>
      first
    </div>
    <div class="bottom-tab" @click="go('/second')">
      <div class="iconfont icon-biaoqianA01_faxian-37"></div>
      second
    </div>
    <div class="bottom-tab" @click="go('/third')">
      <div class="iconfont icon-biaoqianA01_paizhao-38"></div>
      third
    </div>
    <div class="bottom-tab" @click="go('/forth')">
      <div class="iconfont icon-biaoqianA01_wode-40"></div>
      forth
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomBar",
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  mounted() {},
  methods: {
    go(path){
      this.$router.push({ path: path });
    }
  },
};
</script>
<style lang="less" scoped>
.bottom-bar{
  background: white;
  z-index: 99999;
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 3.125rem;//50px
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bottom-tab{
    height: 100%;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    // .iconfont{
    //   width: 1.5625rem;//25px
    //   height: 1.5625rem;//25px
    // }
    .iconfont{
      font-family:"iconfont";/*声明字体类型为iconfont*/
      font-size:1.5625rem;/*设置字体大小为42px*/
      font-style:normal;/*设置字体样式为默认值。浏览器显示一个标准的字体样式。*/
      -webkit-font-smoothing:antialiased;/*设置字体的光滑度属性，也就是CSS3用于webkit引擎(chrome)设置字体抗锯齿属性*/
      -webkit-text-stroke-width:.2px;/*设置文字边框*/
      -moz-osx-font-smoothing:grayscale;/*该属性是为了让字体显示的更清晰的作用*/
    }
  }
  
}

</style>
