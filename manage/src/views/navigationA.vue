<template>
  <div class="main">
    <div class="top-bar-content">
      A
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "navigation-a",
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
