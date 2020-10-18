


<template>
  <div class="main">
    parameter
    <br />
    <br />
    params: {{this.$route.params.id}}
    <br />query:
    <br />
    v1: {{this.$route.query.v1}}
    <br />
    v2: {{this.$route.query.v2}}
    <br />
  </div>
</template>

<script>
export default {
  name: "parameter",
  components: {},
  data() {
    return {
      routeHere: "",
    };
  },
  watch: {
    $route: {
      immediate: true, //最初绑定值的时候也执行handler函数  false时在数据发生变化的时候才执行handler
      deep: true, //对对象进行深度监听
      handler(newVal) {
        // console.log(newVal,"parameter")
        this.routeHere = newVal;
      },
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
</style>
