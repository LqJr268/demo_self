<template>
  <!-- scroll隐藏组件默认会给子元素加上scroll-x -->
  <div style="margin:250px auto;">
    <el-form :model="ruleForm" class="container" ref="adminForm" :rules="rules">
      <h3>后台管理系统</h3>
      <el-form-item prop="adminName">
        <el-input v-model="ruleForm.adminName" placeholder="请输入管理员账号"></el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input type="password" v-model="ruleForm.passWord" placeholder="请输入管理员密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="$store.state.isLoading"
          style="width:100%"
          @click="submitForm('adminForm')"
        >登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      // isLoading:false,
      ruleForm: {
        adminName: "lwy", // 管理员账号
        passWord: "123456", // 管理员密码
      },
      rules: {
        adminName: [
          { required: true, message: "请输入管理员账号", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "管理员长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        passWord: [
          { required: true, message: "请输入管理员密码", trigger: "blur" },
          {
            min: 1,
            max: 16,
            message: "密码长度在 1 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch("login", this);
        }
        // console.log(valid);
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped lang="less">
.container {
  width: 350px;
  border: 1px solid #eaeaea;
  padding: 10px 30px;
  box-shadow: 0 0 30px grey;
  h3 {
    padding: 20px;
    text-align: center;
  }
}
</style>
