<template>
  <div>
    <div>A-c</div>

    <div class="clue-list-component">
      <clueList
        :totalPage="totalPage"
        :totalNum="totalNum"
        :tabList="tabList"
        :pageIndex="pageIndex"
        @sizeChange="handleSizeChange"
        @indexChange="handleIndexChange"
        @secondaryIdentityChange="handleSecondaryIdentityChange"
      ></clueList>
    </div>
  </div>
</template>

<script>
import clueList from "./components/clueList.vue";
import { user } from "@/request";
export default {
  name: "a-c",
  components: { clueList },
  data() {
    return {
      totalPage: 0, //总页数
      totalNum: 0, //总条数
      pageIndex: 1, //当前页
      pageSize: 8, //当前页
      tabList: [], //当前数据组
    };
  },
  computed: {},
  created() {
    let req = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      needToken: true,
    };
    // 风格1
    // user.getList(req)
    //   .then((res) => {
    //     if (res.data.ok === 1) {
    //       console.log(res.data);
    //       this.totalPage = res.data.totalPageSize;
    //       this.totalNum = res.data.totalNum;
    //       this.tabList = res.data.list;
    //       this.pageIndex = 1;
    //     } else {
    //       console.log(res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    // 风格2
    user.getList(
      req,
      (res) => {
        //闭包？？
        if (res.data.ok === 1) {
          // console.log(res.data);
          this.totalPage = res.data.totalPageSize;
          this.totalNum = res.data.totalNum;
          this.tabList = res.data.list;
          this.pageIndex = 1;
        } else {
          // console.log(res.data);
        }
      },
      (err) => {
        console.error(err);
      }
    );
  },
  methods: {
    // 分页改变
    handleSizeChange(size) {
      console.log(size); //分页大小

      this.pageSize = size;
      this.pageIndex = 1;

      let req = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        // needToken: true,
      };
      // // 风格1
      // user.getList(req)
      //   .then((res) => {
      //     if (res.data.ok === 1) {
      //       console.log(res.data);
      //       this.totalPage = res.data.totalPageSize;
      //       this.totalNum = res.data.totalNum;
      //       this.tabList = res.data.list;
      //       this.pageIndex = 1;
      //     } else {
      //       console.log(res.data);
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });

      // 风格2
      user.getList(
        req,
        (res) => {
          //闭包？？
          if (res.data.ok === 1) {
            // console.log(res.data);
            this.totalPage = res.data.totalPageSize;
            this.totalNum = res.data.totalNum;
            this.tabList = res.data.list;
            this.pageIndex = 1;
          } else {
            // console.log(res.data);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
    // 页码改变
    handleIndexChange(index) {
      console.log(index); //当前页码

      this.pageIndex = index;
      let req = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        // needToken: true,
      };
      // 风格1
      // user.getList(req)
      //   .then((res) => {
      //     if (res.data.ok === 1) {
      //       console.log(res.data);
      //       this.totalPage = res.data.totalPageSize;
      //       this.totalNum = res.data.totalNum;
      //       this.tabList = res.data.list;
      //       this.pageIndex = 1;
      //     } else {
      //       console.log(res.data);
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });

      // 风格2
      user.getList(
        req,
        (res) => {
          //闭包？？
          if (res.data.ok === 1) {
            console.log(res.data);
            this.totalPage = res.data.totalPageSize;
            this.totalNum = res.data.totalNum;
            this.tabList = res.data.list;
            this.pageIndex = 1;
          } else {
            console.log(res.data);
          }
        },
        (err) => {
          console.error(err);
        }
      );
    },
    //权限改变
    async handleSecondaryIdentityChange(id, changeRes){
      console.log("权限改变", id, changeRes)

      console.log("1")

      let req = {
        id: id,
        changeRes: changeRes,
        needToken: true
      };
      await user.updateSecondaryIdentity(
        req,
        (res) => {
          if (res.data.ok === 1) {
            // console.log(res.data);
            console.log("2")
            if(changeRes){
              this.$message.success('授权成功')
            }else if(!changeRes){
              this.$message.success('权限已关闭')
            }
          } else {
            console.log(res.data);
            this.$message.error('操作失败')
          }
        },
        (err) => {
          console.error(err);
          this.$message.error('操作失败')
        }
      );

      console.log("3")

      req = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        // needToken: true,
      };
      await user.getList(
        req,
        (res) => {
          //闭包？？
          if (res.data.ok === 1) {
            // console.log(res.data);
            console.log("4")
            this.totalPage = res.data.totalPageSize;
            this.totalNum = res.data.totalNum;
            this.tabList = res.data.list;
            this.pageIndex = 1;
          } else {
            console.log(res.data);
            this.$message.error('操作失败')
          }
        },
        (err) => {
          console.error(err);
        }
      );


      console.log("5")
    }
  },
};
</script>
<style lang="less" scoped>
</style>
