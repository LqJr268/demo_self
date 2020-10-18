<template>
  <!-- goodsDetail -->
  <div>
    <div style="overflow: hidden; position: relative">
      <ul class="swiperUl" ref="swiperUl">
        <li
          v-for="(item, index) in data"
          :key="index"
          ref="swiperLi"
        ></li>
      </ul>
      <div class="imgNum">
        {{ swiperComponents ? swiperComponents.iNow + 1 : 1 }}/{{ data?data.length:1 }}
        <!-- {{ swiperComponents.iNow + 1 }}/{{ data.length }} -->

      </div>
    </div>
    goodsDetail-{{goodsId}}
  </div>
</template>

<script>
/* eslint-disable */
import api from "../api/api.js";
import swiper from "../assets/js/swiper.js";
export default {
  name: "goodsDetail",
  data() {
    return {
      data: null,
      clientW: 0,
      goodsId: 0,
      swiperComponents: null,
    };
  },
  computed: {},
  created() {},
  async beforeMount() {
    //屏幕宽度
    this.clientW = document.body.clientWidth;
    //商品id
    this.goodsId=this.$route.query.goodsId;
    //数据获取
    // await this.getGoodsDetail(this.goodsId);
    const res = await api.getGoodsDetail(this.goodsId)
    // console.log(res)
    this.data = JSON.parse(res.data.Result.Description)
    //轮播构造
    // console.log(swiper)
    let swiperTimer = setTimeout(() => {
      window.clearTimeout(swiperTimer);
      // 引入变高轮播脚本
      this.swiperComponents = new swiper(
        this.$refs.swiperUl,
        this.$refs.swiperLi[0],
        this.data,
        this.clientW,
        0
      );
      this.swiperComponents.drag();
    }, 500);
  },
  mounted() {},
  methods: {
    // getGoodsDetail(id){
    //   try {
    //     const goodsDetailRes = await api.getGoodsDetail(id);
    //   }catch (e) {
    //     console.error(e);
    //   }
    // }
  },
};
</script>
<style lang="less" scoped>
.swiperUl {
  overflow: hidden;
  position: relative;
  li {
    float: left;
    position: relative;
  }
}

.imgNum {
  position: absolute;
  z-index: 99999;
  right: 20px;
  bottom: 15px;
  width: 34px;
  height: 18px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.4;
  border-radius: 9px;
  text-align: center;
  font-size: 11px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
}
</style>
