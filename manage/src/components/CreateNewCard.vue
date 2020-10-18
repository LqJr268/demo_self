<template>
  <!-- <div class="create-new-card" @click="handleClick">
    <img :src="bubbleImg" class="bubble">
    <div class="cover">
      <img :src="icon" class="icon">
      <div class="text">{{text}} <span class="create-tag">NEW</span></div>
    </div>
  </div> -->
  <div class="create-new-card" @click="handleClick">
    <img src="@/assets/img/upload-series/create-series-bubble.png" class="bubble">
    <div class="cover">
      <img src="@/assets/img/upload-series/folder.png" class="icon">
      <div class="text">{{text}} <span class="create-tag">NEW</span></div>
    </div>
  </div>
</template>
<script>
/**
 * 创建新卡片
 * @author
 * @emit click 点击时触发
 */
export default {
  name: 'create-new-card',
  props: {
    // 气泡图片
    bubbleImg: {
      type: String
    },
    // 图标
    icon: {
      type: String
    },
    // 文本
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
<style lang="less" scoped>
@cover-height: 206px;

.create-new-card {
  position: relative;
  flex-shrink: 0;
  width: 273px;
  box-sizing: border-box;
  height: @cover-height + 96px;
  overflow: hidden;
  border-radius: 4px;
  margin-right: 20px;
  margin-bottom: 30px;
  transition: all 0.2s;
  color: #CCCCCC;
  font-size: 14px;
  overflow: visible;
  cursor: pointer;
  // 气泡
  .bubble {
    position: absolute;
    width: 174px;
    height: 33px;
    top: -20px;
    opacity: 0;
    z-index: 10;
    transition: all 0.2s;
  }
  &:hover {
    .bubble {
      opacity: 1;
      transition: all 0.2s;
    }
  }

  // 封面
  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: @cover-height;
    border:2px dashed rgba(212,220,227,1);
    overflow: hidden;
    .icon {
      width: 36px;
      height: 36px;
    }
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      .create-tag {
        background: #0084F6;
        color: #fff;
        border-radius: 3px;
        margin-left: 6px;
        font-size: 12px;
        line-height: 16px;
        padding: 0px 4px;
        height: 16px;
      }
    }
  }
}
</style>
