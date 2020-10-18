<template>
  <div class="list-contain">
    <div class="list-wrapper">
      <el-table
        border
        :data="tabListHere"
        class="el-table tab-loading"
        style="width:600px;"
        :row-class-name="tableRowClassName"
      >
      <!--         style="width:800px;"
        :height="500" -->
        <!-- <el-table-column prop="id" label="日期" width="180"></el-table-column>
        <el-table-column prop="id" label="姓名" width="180"></el-table-column>
        <el-table-column prop="id" label="地址"></el-table-column> -->
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="password" label="密码" width="180"></el-table-column>
        <el-table-column prop="" label="占位" width="600"></el-table-column>
        <el-table-column fixed="right" prop="" label="上架商品权限" width="180">
          <!-- <el-button type="success" size="mini" :disabled='row.isPhotoGrapher'>通过</el-button>
          <el-button type="primary" size="mini" :disabled='!row.isPhotoGrapher'>拒绝</el-button> -->
          <template slot-scope="scope">
            <el-button v-if="scope.row&&!scope.row.primaryIdentity" :item="scope.row" type="success" size="mini" :disabled='scope.row.secondaryIdentity' @click="giveSecondaryIdentity(scope.row.id)">开启</el-button>
            <el-button v-if="scope.row&&!scope.row.primaryIdentity" :item="scope.row" type="primary" size="mini" :disabled='!scope.row.secondaryIdentity' @click="closeSecondaryIdentity(scope.row.id)">关闭</el-button>

            <el-button v-if="scope.row&&scope.row.primaryIdentity" :item="scope.row" type="success" size="mini" :disabled='!scope.row.secondaryIdentity'>一级管理员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <page-bar
        :move-left="38"
        :total="totalNum"
        :current-page="pageIndex"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></page-bar>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/**************************************
* 线索列表 组件
* @description 接受tableData数组数据时 编辑客户  关联活动
* @author yangtao
* ************************************
属性                数据类型   描述信息
totalPage                 Number    总页数
tabList                 Array    表单信息
* *************************************/
import pageBar from "@/components/pageBar/index";

export default {
  props: {
    totalPage: {
      type: Number,
      default: 0,
    },
    totalNum: {
      type: Number,
      default: 0,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
    // 表单信息
    tabList: {
      type: Array,
      default: () => [
        {
          id: {
            type: Number,
            default: "",
          },
          name: {
            type: String,
            default: ''
          },
          isPhotoGrapher: {
            type: Boolean,
            default: ''
          }
        },
      ],
    },
  },
  watch: {
    tabList: function(newVal,oldVal){
      console.log("newVal",newVal)
      this.tabListHere = newVal;  //newVal即是chartData
      this.useTabList();
    }
  },
  components: { pageBar },
  data() {
    return {
      pageSize: 8, // 分页单位
      pageSizes: [8, 16],
      tabListHere: []
    };
  },
  created() {
  },
  methods: {
    useTabList() {
      console.log("tabListHere",this.tabListHere)
    },
    tableRowClassName: function (row, index) {
      // console.log(row.row)
      if (!row.row) {
        console.log("row.row")
        return 'hidden-row';
      }
      return '';
    },
    // 分页改变
    handleSizeChange(size) {
      // console.log(size); //分页大小
      this.$emit("sizeChange", size);
    },
    // 页码改变
    handleCurrentChange(index) {
      // console.log(index); //当前页码
      this.$emit("indexChange", index);
    },
    //授权
    giveSecondaryIdentity(id){
      // console.log(id,"开启授权")
      this.$emit("secondaryIdentityChange", id, true);
    },
    //关闭授权
    closeSecondaryIdentity(id){
      // console.log(id,"关闭授权")
      this.$emit("secondaryIdentityChange", id, false);
    }
  },
};
</script>
<style lang="less" scoped>
  /deep/ .el-table .hidden-row {
    display: none;
  }
</style>

// <style lang="less">
//   .el-table .hidden-row {
//     display: none;
//   }
// </style>
