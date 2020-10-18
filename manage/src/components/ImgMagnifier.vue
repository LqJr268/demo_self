<template>
  <div class="img-magnifier">
    <div
      class="small-container"
      :style="{'border-radius': imgBorderRadius, width: width + 'px', height: height + 'px'}"
    >
      <img
        :src="src"
        alt=""
        class="small"
        @mouseenter="isShowBigImg = true"
        @mouseleave="isShowBigImg = false"
      >
    </div>

    <img
      :src="src"
      alt=""
      class="big"
      v-show="isShowBigImg"
      :style="{transform: `translateX(${width + 12}px) translateY(-${height}px)`}"
    >
  </div>
</template>
<script>
export default {
  name: 'img-magnifier',
  props: {
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    src: {
      type: String
    },
    imgBorderRadius: {
      type: String
    }
  },
  data () {
    return {
      isShowBigImg: false
    }
  },
  methods: {
    enter(){
      this.isShowBigImg = true
    },
    leave(){
      this.isShowBigImg = false
    }
  }
}
</script>
<style lang="less" scoped>
.img-magnifier {
  position: relative;
  .small-container {
    overflow: hidden;
    .small {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .big {
    position: absolute;
    box-shadow: 0px 0px 20px 0px #999;
    z-index: 1000;
    height: 260px;
  }
}
</style>
