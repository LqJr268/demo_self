<template>
  <!-- 顶栏 -->
  <div class="top-bar">
    <div class="leftCon">占位占位占位占位</div>
    <div class="rightCon">
      <img src="@/assets/img/icon_search_24_nor@2x.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "topBar",
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  mounted() {},
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
.top-bar{
  background: white;
  z-index: 99999;
  height: 3.125rem;//50px
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  padding: 0 1rem;//16px
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .leftCon{
    max-width: 25%;
    overflow: hidden; 
    text-overflow:ellipsis; 
    white-space: nowrap;
  }
  .rightCon{
    flex-grow: 1;
    margin-left: 1rem;//16px
    background:rgb(247, 247, 247, 1);
    border-radius: 0.25rem;//4px
    display: flex;
    align-items: center;
    height: 2.125rem;//34px
    img{
      width: 1.5rem;//24px
      height: 1.5rem;//24px
      margin-left: 0.3125rem;//5px
    }
  }
}

</style>
