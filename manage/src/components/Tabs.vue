<template>
  <div class="tab-and-search">
    <!-- tab -->
    <el-tabs
      class="top-tab"
      :value="activeTabName"
      @input="val => $emit('update:activeTabName', val)"
      @tab-click="changeTab"
    >
      <el-tab-pane name="enabled">
        <div slot="label" class="tab-title">
          {{leftText}} <div class="num">{{leftNum}}</div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="disabled">
        <div slot="label" class="tab-title">
          {{rightText}} <div class="num">{{rightNum}}</div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- search -->
    <div class="search" v-if="isEnableSearch">
      <el-input
        :placeholder="searchPlaceholder"
        prefix-icon="el-icon-search"
        :value="searchText"
        @input="val => $emit('update:searchText', val)"
        @keyup.enter.native="search"
      >
      </el-input>
      <el-button
        type="primary"
        class="search-btn"
        @click="search"
      >
        搜索
      </el-button>
    </div>
  </div>
</template>

<script>
/**
 * tab和搜索栏
 * @author
 * @emit changeTab 切换标签页时触发. 传入当前激活的标签页
 * @emit search 搜索时触发, 传入搜索文本框
 */
export default {
  name: 'tab-and-search',
  props: {
    // 是否显示搜索框
    isEnableSearch: {
      type: Boolean,
      default: false
    },
    // 左侧文本
    leftText: {
      type: String,
      default: ''
    },
    // 右侧文本
    rightText: {
      type: String,
      default: ''
    },
    // 左边tab的数字
    leftNum: {
      type: Number,
      default: 0
    },
    // 右边tab的数字
    rightNum: {
      type: Number,
      default: 0
    },
    // 激活的tab名, 支持.sync
    activeTabName: {
      type: String
    },
    // 当前的search文本, 支持.sync
    searchText: {
      type: String,
      default: ''
    },
    // search输入框的占位符
    searchPlaceholder: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 切换标签页
    changeTab (el) {
      this.$emit('change-tab', el)
    },

    // 搜索
    search () {
      this.$emit('search', this.searchText)
    }
  }
}
</script>
<style lang="less" scoped>
// tab and search
.tab-and-search {
  height: 84px;
  position: relative;
  // tab
  /deep/ .el-tabs {
    height: 100%;
    .el-tabs__header {
      height: 100%;
      margin-bottom: 0;
      .el-tabs__nav-wrap {
        height: 100%;
      }
      .el-tabs__nav-scroll {
        height: 100%;
      }
      .el-tabs__nav {
        height: 100%;
      }
    }
    // 每个标签页
    .el-tabs__item {
      width: 240px;
      height: 100%;
    }
    // 标题
    .tab-title {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: #ccc;
      transition: all 0.2s;
      .num {
        padding: 0 6px;
        height: 18px;
        border-radius: 3px;
        line-height: 18px;
        background: #CCCCCC;
        color: #fff;
        text-align: center;
        font-size: 11px;
        margin-left: 10px;
        transition: all 0.2s;
      }
    }
    // 激活标题
    .el-tabs__item.is-active .tab-title {
      transition: all 0.2s;
      color: #1D252A;
      .num {
        background: #222;
        transition: all 0.2s;
      }
    }
  }
  // 搜索
  .search {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    margin-top: 25px;
    .el-input {
      width: 400px;
    }
    .search-btn {
      width: 95px;
      margin-left: 8px;
      text-align: center;
    }
  }
}
</style>
