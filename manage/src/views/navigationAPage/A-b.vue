<template>
<div>
  <div>A-b</div>

  <div class="series-management">
    <!-- 顶栏 -->
    <div class="top-bar">

      <!-- tab and search -->
      <tabs
        :is-enable-search="true"
        left-text="已上架"
        right-text="下架中"
        :left-num="enabledSeriesCount"
        :right-num="disabledSeriesCount"
        :active-tab-name.sync="activeTabName"
        :search-text.sync="searchText"
        @change-tab="changeTab"
        @search="search"
        search-placeholder="搜索你的套系"
      ></tabs>
    </div>

    <!-- 套系列表 -->
    <div class="series-list">
      <!-- 新建套系 -->
      <create-new-card
        v-if="currnetPage === 1 && !isSearching"
        bubble-img="@/assets/img/upload-series/createseriesbubble.png"
        icon="@/assets/img/upload-series/folder.png"
        text="新建套系"
        @click="goEdit()"
      >
      </create-new-card>

      <!-- 卡片 -->
      <card
        v-for="item of series"
        :key="item.Id"
        :item-id="item.Id"
        :cover="item.Cover"
        :is-disabled="item.Delisting"
        :is-show-disabled-modal="true"
        disabled-text="已下架"
      >
        <!-- slot: 操作 -->
        <template slot="edit-modal">
          <el-button @click="goEdit(item.Id)">编辑</el-button>
          <el-button v-if="!item.Delisting" type="danger" @click="disable(item.Id)">下架</el-button>
          <el-button v-if="item.Delisting" type="danger" @click="enable(item.Id)">上架</el-button>
        </template>

        <!-- slot: 禁用 -->
        <template slot="disabled-modal">
          已下架
        </template>

        <!-- slot: 信息栏 -->
        <template slot="info-bar">
          <div class="info">
            <div class="line-1">
              <div class="name">[{{getLocationName(item)}} • {{(item.PhotographyCategory && item.PhotographyCategory !== 'None') ? item.PhotographyCategory : ''}}] {{item.Name}}</div>
              <div class="edit" @click="goEdit(item.Id)">
                <img src="../../assets/img/upload-series/edit.png">
              </div>
            </div>
            <div class="line-2">
              <div class="price">¥{{item.Price}}</div>
              <!-- 后台返回的时间是字符串, 这里直接截断显示年月 -->
              <div class="date">{{item.CreatedAt.split('T')[0]}}</div>
            </div>
          </div>
        </template>
      </card>
    </div>

    <!-- 暂无套系 -->
    <div v-if="isSearching && !series.length" class="no-series">暂无相关套系</div>

    <!-- 分页 -->
    <pager
      :page-size="pageSize"
      :total="curSeriesCount"
      :current-page.sync="currnetPage"
      @current-change="pageChange"
    ></pager>

  </div>
</div>
</template>

<script>
import { series } from "@/request";

import tabs from '@/components/Tabs'
import createNewCard from '@/components/CreateNewCard'
import card from '@/components/Card'
import pager from '@/components/Pager'
import listPage from '@/mixins/listPage.js'

export default {
  name: "a-b",
  mixins: [listPage],
  components: {
    tabs,
    createNewCard,
    card,
    pager
  },
  data() {
    return {
      activeTabName: 'enabled',
      userData: JSON.parse(localStorage.getItem('userData')),
      series: [], // 用户套系
      pageSize: 8,
      curSeriesCount: 0, // 当前套系数量
      enabledSeriesCount: 0, // 已启用套系数量
      disabledSeriesCount: 0, // 已禁用套系数量
      isSearching: false
    };
  },
  computed: {},
  methods: {
    // 前往编辑页面
    goEdit (id) {
      if (id) {
        this.$router.push({
          path: '/EditSeries',
          query: {
            id
          }
        })
      } else {
        this.$router.push(`/EditSeries`)
      }
    },

    // 获取地址
    getLocationName (item) {
      if (item.AreaName) return item.AreaName.split('/')[0]
    },

    // 上架
    async enable (id) {
      this.$openLoading(this.loadingClass)
      try {
        await series.series.enableSeries(id)
        this.$message.success('上架成功')
        this.apiGetCount()
        await this.apiGetList()
      } catch (e) {
        this.$message.error('上架失败')
        this.apiGetCount()
        await this.apiGetList()
      }
      this.$closeLoading(this.loadingClass)
    },

    // 下架
    async disable (id) {
      this.$openLoading(this.loadingClass)
      try {
        await series.series.disableSeries(id)
        this.$message.success('下架成功')
        this.apiGetCount()
        await this.apiGetList()
      } catch (e) {
        this.$message.error('下架失败')
        this.apiGetCount()
        await this.apiGetList()
      }
      this.$closeLoading(this.loadingClass)
    },

    // 获取套系列表
    async apiGetList () {
      try {
        const query = {
          pageIndex: this.currnetPage,
          // pageSize: this.currnetPage===1?this.pageSize-1:this.pageSize,
          pageSize: this.pageSize,
          sellerId: JSON.parse(sessionStorage.getItem('userData')).Id,
          delisting: !(this.activeTabName === 'enabled')
        }
        if (this.searchText) query.key = this.searchText
        // console.log('获取商品列表: ', query, 'api列表', series)

        const res = await series.series.getSeriesList(query)
        // console.log(res)
        this.series = res.data.Result
        this.curSeriesCount = res.data.totalNum

        if (this.searchText) {
          this.isSearching = true
        } else {
          this.isSearching = false
        }
        console.log('商品列表: ', res)
        console.log('当前状态商品数量: ', this.curSeriesCount)
      } catch (e) {
        console.error('获取商品列表失败', e)
        this.$message.error('获取商品列表失败')
      }
    },

    // 获取套系数量
    async apiGetCount () {
      const query = {
        pageIndex: 1,
        pageSize: 1,
        sellerId: JSON.parse(sessionStorage.getItem('userData')).Id
      }
      if (this.searchText) query.key = this.searchText
      await series.series.getSeriesList({...query})
        .then(res => {
          this.enabledSeriesCount = res.data.totalNum
          console.log('总数量: ', res.data.totalNum)
        })
        .catch(err => {
          console.error('获取总数量失败')
        })
      await series.series.getSeriesList({...query, delisting: false})
        .then(res => {
          this.enabledSeriesCount = res.data.totalNum
          console.log('上架数量: ', res.data.totalNum)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.error('获取上架数量失败')
        })
      await series.series.getSeriesList({...query, delisting: true})
        .then(res => {
          this.disabledSeriesCount = res.data.totalNum
          console.log('下架数量: ', res.data.totalNum)
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.error('获取下架数量失败')
        })
    }
  },
  created () {
    if (this.$route.query && this.$route.query.tab) {
      if (this.$route.query.tab === 'disabled') {
        this.activeTabName = 'disabled'
      }
    }
  }
};
</script>
<style lang="less" scoped>
.series-management {
  font-size: 16px;
  color: #1D252A;
  width: 1172px;
  margin: 0 auto;
  padding: 93px 0;
  // 顶栏
  .top-bar {
    width: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    height: 150px;
  }

  // 套系列表
  .series-list {
    @cover-height: 206px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 55px;
    // 信息
    .info {
      display: flex;
      flex-direction: column;
      padding: 0 16px;
      .line-1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 13px;
        .name {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .edit {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          margin-left: 4px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .line-2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        .price {
          color: #FA5555;
          font-weight: bold;
        }
        .date {
          color: #CCCCCC;
          font-size: 12px;
        }
      }
    }
  }

  // 暂无相关套系
  .no-series {
    padding: 140px 0px;
    text-align: center;
    color: #999;
  }

  // 分页
  .pager {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
}
</style>
