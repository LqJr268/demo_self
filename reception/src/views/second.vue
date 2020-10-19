<template>
  <div>
    second
    <div class="area">
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
      <div class="out">
        <div class="in"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "second",
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  mounted() {},
  methods: {
    
  },
};
</script>
<style lang="less" scoped>
.area{
  display:flex;
  flex-wrap:wrap;
  justify-content:flex-start;
  align-items:center;
  .out{
    height:80px;
    width:25%;
    padding:10px;
    box-sizing:border-box;
    .in{
      background:black;
      width:100%;
      height:100%;
    }
  }
}
</style>
