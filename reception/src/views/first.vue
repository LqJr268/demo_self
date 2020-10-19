<template>
  <!-- first -->
  <div id="mainCon">

    <!-- 顶部banner -->
    <div style="height: 200px; background: rgb(204, 204, 204)"></div>

    <!-- 类别栏 -->
    <!-- {{typeScrollComponents?typeScrollComponents.iNow:0}} -->
    <div style="overflow: hidden; margin: 10px 0">
      
      <!-- <div
        :style="{
          width: (clientW / 5.5) * type.length + 'px',
          overflow: 'hidden',
          transform: typeScrollComponents
            ? typeScrollComponents.iNow >= 5
              ? 'translateX(-' +
                ((clientW / 5.5) * type.length - clientW) +
                'px)'
              : ''
            : '',
          transition: '.2s',
        }"
        ref="typeCon"
      > -->

      <div
        :style="{
          width: (clientW / 5.5) * type.length + 'px',
          overflow: 'hidden',
          transform: 'translateX(' + typeMove + 'px)',
        }"
        ref="typeCon"
      >

        <div
          v-for="(item, index) in type"
          :key="index"
          :style="{
            float: 'left',
            width: clientW / 5.5 + 'px',
            fontSize: clientW / 5.5 / 5 + 'px',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: '24px',
            color: typeScrollComponents
              ? index === typeScrollComponents.iNow
                ? 'rgba(34,34,34,1)'
                : 'rgba(204,204,204,1)'
              : index === 0
              ? 'rgba(34,34,34,1)'
              : 'rgba(204,204,204,1)',
            paddingLeft: '5px',
            boxSizing: 'border-box',
          }"
          @click="changeScroll(index)"
        >
          {{ item }}
        </div>

      </div>
    </div>
    
    <!-- 布局切换栏 -->
    <div class="changeShow">
      <div style="width: 24px; height: 24px" @click="showChange = true">
        <img
          style="width: 100%; height: 100%"
          v-if="showChange"
          src="@/assets/img/icon_mode_24_fallssel@2x.png"
        />
        <img
          style="width: 100%; height: 100%"
          v-if="!showChange"
          src="@/assets/img/icon_mode_24_fallsnor@2x.png"
        />
      </div>
      <div
        style="width: 21px; height: 26px; margin-left: 10px"
        @click="showChange = false"
      >
        <img
          style="transform: rotate(270deg); width: 100%; height: 100%"
          v-if="!showChange"
          src="@/assets/img/icon_mode_24_fallssel@2x.png"
        />
        <img
          style="transform: rotate(270deg); width: 100%; height: 100%"
          v-if="showChange"
          src="@/assets/img/icon_mode_24_fallsnor@2x.png"
        />
      </div>
    </div>

    <!-- 内容区域 -->
    <div class="goodsOut">
      <div
        class="goodsScroll"
        ref="goodsScroll"
        :style="{ width: clientW * goods.length + 'px' }"
      >
        <div
          class="goodsCon"
          :style="{ width: clientW + 'px' }"
          v-for="(item, index) in goods"
          :key="index"
        >
          <!-- {{ index }} -->
          <!-- 布局1 -->
          <div v-if="showChange" class="firstShow">
            <!-- 瀑布流左列 -->
            <div class="leftBox">
              <div
                class="itemBox"
                v-for="(itemIn, indexIn) in item.leftList"
                :key="indexIn"
                :style="{
                  width: clientW / 2 - 15 + 'px',
                  height:
                    ((clientW / 2 - 15) * itemIn.CoverHeight) /
                      itemIn.CoverWidth +
                    'px',
                  backgroundImage: 'url(' + itemIn.Cover + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }"
                @click="goDetail(itemIn.Id)"
              >
                <div class="bottomBox"></div>
              </div>
            </div>
            <!-- 瀑布流右列 -->
            <div class="rightBox">
              <div
                class="itemBox"
                v-for="(itemIn, indexIn) in item.rightList"
                :key="indexIn"
                :style="{
                  width: clientW / 2 - 15 + 'px',
                  height:
                    ((clientW / 2 - 15) * itemIn.CoverHeight) /
                      itemIn.CoverWidth +
                    'px',
                  backgroundImage: 'url(' + itemIn.Cover + ')',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                }"
                @click="goDetail(itemIn.Id)"
              >
                <div class="bottomBox"></div>
              </div>
            </div>
          </div>
          <!-- 布局2 -->
          <div v-if="!showChange" class="secondShow clearFloat">
            <div
              v-for="(itemIn, indexIn) in item.horizontalCollections"
              :key="indexIn"
              :style="{
                position: 'relative',
                width: itemIn.width - 4 + 'px',
                height: itemIn.height - 4 + 'px',
                boxSizing: 'border-box',
                float: 'left',
                margin: 2 + 'px',
                overflow: 'hidden',
                transition: '.1s',
                backgroundImage: 'url(' + itemIn.img + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }"
              @click="goDetail(itemIn.Id)"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import api from "../api/api.js";
import typeScroll from "../assets/js/typeScroll.js";

// import { getType } from "../api/api.js";??????

export default {
  name: "first",
  data() {
    return {
      type: [], //类别列表
      goods: [], //商品列表
      clientW: 0, //屏幕宽度
      typeScrollComponents: null, //swiper区域
      showChange: true, //更改布局

      typeMove: 0,//滑动过程中相对于起点偏移量？？
      typeEnd: 0,//滑动结束时相对于起始位置偏移量
    };
  },
  computed: {},
  watch: {
    "typeScrollComponents.iNow": {
      // immediate: true, //最初绑定值的时候也执行handler函数  false时在数据发生变化的时候才执行handler
      deep: true, //对对象进行深度监听
      handler(newVal) {
        // console.log(newVal, "typeScrollComponents");
        this.typeScrollComponents.iNow = newVal;
        this.conChange();
      },
    },
  },
  async created() {
    // console.log("导入的方法", api);
    // console.log("导入的方法",getType)??????

    await this.getTypeRes();
    console.log("类别获取结果", this.type);

    for (let i = 0; i < this.type.length; i++) {
      await this.getGoods(1, 6, this.type[i]);
    }
    // console.log("商品获取结果", this.goods);
  },
  async beforeMount() {
    this.clientW = document.body.clientWidth;
    // console.log(this.clientW);

    this.typeScrollComponents = await this.typeScroll();
    // this.typeScrollComponents = this.typeScroll();
    this.typeScrollComponents.drag();
    // console.log("轮播构造结果", this.typeScrollComponents);

    this.goods.map((item, index) => {
      this.dataFix(this.goods[index].goods, index);
    });
    console.log("数据整合完毕", this.goods);
  },
  mounted() {
    window.addEventListener("scroll", this.handleFun);

    var typeMoveStart = 0;
    this.$refs.typeCon.addEventListener("touchstart", (e) => {
      // console.log("触摸滑条",e.targetTouches[0].pageX)//e就是事件
      typeMoveStart = e.targetTouches[0].pageX;
      // console.log(this.typeEnd);
    });
    this.$refs.typeCon.addEventListener("touchmove", (e) => {
      // console.log("滑动",e.targetTouches[0].pageX)//e就是事件
      // if(this.typeMove)
      // typeEnd: (this.clientW / 5.5) * this.type.length-this.clientW ~ 0
      // console.log(this.typeEnd + e.targetTouches[0].pageX - typeMoveStart,0,-((this.clientW / 5.5) * this.type.length-this.clientW))
      if (this.typeEnd + e.targetTouches[0].pageX - typeMoveStart < 0 && this.typeEnd + e.targetTouches[0].pageX - typeMoveStart > -((this.clientW / 5.5) * this.type.length-this.clientW)) {
        this.typeMove = this.typeEnd + e.targetTouches[0].pageX - typeMoveStart;
        console.log(this.typeMove);
      }
    });
    this.$refs.typeCon.addEventListener("touchend", (e) => {
      // console.log("滑动",e.targetTouches[0].pageX)//e就是事件
      this.typeEnd = this.typeMove;
      // console.log(this.typeEnd);
    });
  },
  methods: {
    // 获取类别信息
    async getTypeRes() {
      try {
        // this.$openLoading()
        const typeRes = await api.getType();

        // const typeRes = await getType()??????

        this.type = typeRes.data.Result;
        // this.$closeLoading()
      } catch (e) {
        // this.$message.error('获取套系信息失败')
        console.error(e);
      }
    },
    // 获取各类别下商品
    async getGoods(pageIndex, pageSize, typeName) {
      try {
        // this.$openLoading()

        const goodsRes = await api.getGoods(pageIndex, pageSize, typeName);

        if (this.goods.length === this.type.length) {
          console.log("说明已有数据不是第一次获取");
          this.goods[this.typeScrollComponents.iNow].goods = this.goods[
            this.typeScrollComponents.iNow
          ].goods.concat(goodsRes.data.Result);

          this.dataFix(goodsRes.data.Result, this.typeScrollComponents.iNow);
        } else {
          var goodsResEach = {};
          goodsResEach.goods = goodsRes.data.Result;
          //竖向瀑布流相关变量
          goodsResEach.leftList = [];
          goodsResEach.leftHeight = 0;
          goodsResEach.rightList = [];
          goodsResEach.rightHeight = 0;
          //横向瀑布流相关变量
          goodsResEach.horizontalCollections = [];
          //分页相关变量
          goodsResEach.totalPageNum = goodsRes.data.totalPageNum;
          goodsResEach.pageIndex = 1;
          goodsResEach.pageSize = 6;

          this.goods.push(goodsResEach);
        }

        // this.$closeLoading()
      } catch (e) {
        // this.$message.error('获取套系信息失败')
        console.error(e);
      }
    },

    // 引入轮播脚本
    typeScroll() {
      let this_ = this;
      return new Promise((resolve, reject) => {
        let typeScrollTimer = setTimeout(function () {
          window.clearTimeout(typeScrollTimer);
          // 引入
          var typeScrollComponents = new typeScroll(
            this_.$refs.goodsScroll,
            this_.clientW
          );
          // console.log("typeScrollComponents", typeScrollComponents)

          // return typeScrollComponents;
          resolve(typeScrollComponents);
        }, 1000); //??
      });
    },
    // 重构商品数据结构
    dataFix(data, index) {
      console.log("传入待构造的数据", data, index);
      var horizontalCollections = [];
      data.map((item) => {
        //构建竖向瀑布流左右侧列表
        if (this.goods[index].leftHeight <= this.goods[index].rightHeight) {
          this.goods[index].leftList.push(item);
          this.goods[index].leftHeight += item.CoverHeight + 87;
        } else {
          this.goods[index].rightList.push(item);
          this.goods[index].rightHeight += item.CoverHeight + 87;
        }
        //构建横向瀑布流图片集合
        var horizontalImages = {};
        if (item.CoverWidth > 0 && item.CoverHeight > 0) {
          horizontalImages.img = item.Cover;
          horizontalImages.Id = item.Id;
          horizontalImages.width = item.CoverWidth;
          horizontalImages.height = item.CoverHeight;
          horizontalCollections.push(horizontalImages);
        }
      });
      // 创建一个布局实例
      const layout = new ImagesLayout(
        horizontalCollections,
        this.clientW - 20,
        2
      );
      // 通过 layout 的 completedImages 获取所有图片的布局信息
      const layoutData = layout;
      // console.log("layoutData", layoutData);
      this.goods[index].horizontalCollections = this.goods[
        index
      ].horizontalCollections.concat(layoutData.completedImages);
      // console.log("horizontalCollections",this.goods[index].horizontalCollections);
    },

    // 轮播滚动
    conChange() {
      console.log("轮播滚动", this.typeScrollComponents.iNow);

      // window.scrollTo(0,0)
      if (window.scrollY > 210) {
        window.scrollTo({
          top: 210,
          behavior: "smooth",
        });
      }

      if(this.typeScrollComponents.iNow>=5){
        this.typeMove = -((this.clientW / 5.5) * this.type.length - this.clientW)
      }
      if(this.typeScrollComponents.iNow<=2){
        this.typeMove = 0
      }
    },
    //监听页面滚动
    async handleFun() {
      // console.log("页面滚动",window.scrollY,window.screen.height,document.getElementById("mainCon").scrollHeight);
      if (window.scrollY === 0) {
        // console.log("触顶");
      }
      if (window.scrollY > 50) {
        // console.log("吸顶");
      }
      if (
        window.scrollY + window.screen.height >
        50 + document.getElementById("mainCon").scrollHeight
      ) {//滚过高度+屏幕高度>页面大元素高度+大元素距整个文档顶部高度
        // console.log("触底");
        if (
          this.goods[this.typeScrollComponents.iNow].pageIndex <
          this.goods[this.typeScrollComponents.iNow].totalPageNum
        ) {
          this.goods[this.typeScrollComponents.iNow].pageIndex++;
          await this.getGoods(
            this.goods[this.typeScrollComponents.iNow].pageIndex,
            this.goods[this.typeScrollComponents.iNow].pageSize,
            this.type[this.typeScrollComponents.iNow]
          );
          console.log("加载更多", this.goods);
        } else {
          console.log("没有更多了");
        }
      }
    },

    // 轮播切换
    changeScroll(index) {
      console.log("轮播切换", index);
      this.typeScrollComponents.iNow = index;
      this.typeScrollComponents.goSwiperItem(index);
    },
    // 去往详情页
    goDetail(id) {
      console.log("去详情页", id);
      this.$router.push({ path: "/goodsDetail", query: { goodsId: id } });
    },
  },
};
</script>
<style lang="less" scoped>
#mainCon {
  // margin-top: 60px;
}

.changeShow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
}

.goodsOut {
  overflow: hidden;
  // margin-bottom: 3.75rem;//60px

  margin-bottom: 3.125rem; //50px

  .goodsScroll {
    overflow: hidden;
    .goodsCon {
      float: left;
    }
  }
}
// .goodsCon:nth-child(1) {
//   background: red;
//   height: 500px;
// }
// .goodsCon:nth-child(2) {
//   background: yellow;
//   height: 5000px;
// }
// .goodsCon:nth-child(3) {
//   background: green;
// }
.firstShow {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  .itemBox {
    position: relative;
    box-sizing: border-box;
    margin-bottom: 87px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.06);
    border-radius: 4px 4px 0px 0px;
    .bottomBox {
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.06);
      border-radius: 0 0 4px 4px;
      bottom: -78px;
      width: 100%;
      height: 78px;
      position: absolute;
      box-sizing: border-box;
    }
  }
}

.secondShow {
  margin: 0 10px;
}
.clearFloat:after {
  content: "";
  display: block;
  clear: both;
}
</style>
