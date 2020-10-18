<template>
  <div class="main">
    <div class="top-bar-content">
      J
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation-j",

  components: {},
  data() {
    return {
      dataHere: [],
    };
  },
  computed: {},
  created() {},
};
</script>
<style lang="less" scoped>
.main {
  display: flex;
}
</style>
