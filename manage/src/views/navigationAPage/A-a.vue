<template>
  <div>
    <div v-if="primaryIdentity">最高级管理员 可以管理商家权限</div>
    <div v-if="secondaryIdentity">开始商品管理</div>
    <div v-if="!secondaryIdentity&&!primaryIdentity">您的商户资质尚未开通</div>
  </div>
</template>

<script>
export default {
  name: "a-a",

  components: {},
  data() {
    return {
      primaryIdentity: JSON.parse(sessionStorage.getItem('userData')).primaryIdentity,
      secondaryIdentity: JSON.parse(sessionStorage.getItem('userData')).secondaryIdentity
    };
  },
  computed: {},
  created() {},
};
</script>
<style lang="less" scoped>
</style>
