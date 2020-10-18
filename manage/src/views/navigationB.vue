<template>
  <div class="main">
    <div class="top-bar-content">
      B
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation-b",
  components: {},
  data() {
    return {};
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
