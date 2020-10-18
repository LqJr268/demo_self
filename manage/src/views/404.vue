<template>
  <div class="page-404">
    <div class="img-container">
      <img src="@/assets/img/404.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'page404',
  methods: {

  }
};
</script>
<style lang="less" scoped>
.page-404 {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #F7F7F7;
  .img-container {
    margin: 0 auto;
    padding-top: 15%;
    width: 305px;
    height: 305px;
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
