<template>
  <div class="card">
    <!-- 图片 -->
    <div :class="['cover', isDisabled && 'is-disabled']">
      <img :src="cover"/>

      <!-- 遮罩: 操作 -->
      <div class="edit-modal">
        <!-- slot: 操作 -->
        <slot name="edit-modal"></slot>
      </div>

      <!-- 遮罩: 禁用 -->
      <div class="disabled-modal" v-if="isShowDisabledModal && isDisabled">
        <!-- slot: 禁用 -->
        <slot name="disabled-modal"></slot>
      </div>
    </div>

    <!-- 信息栏 -->
    <div class="info-bar">
      <!-- slot: 信息栏 -->
      <slot name="info-bar"></slot>
    </div>
  </div>
</template>
<script>
/**
 * 适用于套系的card
 * @author
 * @date 2020-9-21
 */
export default {
  name: 'card',
  props: {
    // 当前item的id
    itemId: {
      type: [Number, String],
      required: true
    },
    // 封面
    cover: {
      type: String
    },
    // 是否禁用
    isDisabled: {
      type: Boolean,
      default: false
    },
    // 是否显示禁用遮罩
    isShowDisabledModal: {
      type: Boolean,
      default: false
    },
    // 禁用提示
    disabledText: {
      type: String,
      defautl: ''
    }
  },
  data () {
    return {
      abc: 123
    }
  },
  methods: {
    handleClick () {
      this.$emit('click', this.itemId)
    }
  }
}
</script>
<style lang="less" scoped>
@cover-height: 206px;

// 卡片
.card {
  flex-shrink: 0;
  width: 273px;
  box-sizing: border-box;
  height: @cover-height + 94px;
  overflow: hidden;
  border-radius: 4px;
  margin-right: 20px;
  margin-bottom: 30px;
  transition: all 0.2s;
  &:not(.create-new-card):hover {
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
    transform: translateY(-20px);
    transition: all 0.2s;
  }

  // 封面
  .cover {
    width: 100%;
    height: @cover-height;
    overflow: hidden;
    img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    // 编辑遮罩
    .edit-modal {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: @cover-height;
      background:rgba(34,34,34,0.5);
      transition: all 0.2s;
      z-index: 10000;
      border-radius: 4px;
      .el-button {
        width: 95px;
      }
    }
    // 禁用遮罩
    .disabled-modal {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: @cover-height;
      background: rgba(34,34,34,0.5);
      color: #FFFFFF;
      font-size: 30px;
      transform: translateY(-(@cover-height * 2 + 4px));
      border-radius: 4px;
      transition: all 0.2s;
    }
    // 鼠标放上去时的遮罩浮现效果
    &:not(.is-disabled):hover {
      .edit-modal {
        cursor: default;
        transform: translateY(-(@cover-height + 4px));
        transition: all 0.2s;
      }
    }
    &.is-disabled:hover {
      .disabled-modal {
        opacity: 0;
        transition: all 0.2s;
      }
      .edit-modal {
        cursor: default;
        transform: translateY(-(@cover-height + 4px));
        transition: all 0.2s;
      }
    }
  }
}
</style>
