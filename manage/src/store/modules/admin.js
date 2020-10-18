// import axios from "axios";
import { login } from "@/request";

export default {
  state: {
    token: '',
  },
  mutations: {
    CHANGE_TOKEN(state, token) {
      state.token = token;
    },
  },
  actions: {
    login({ commit }, vm) {//{commit} vuex提交对象，vm：调用vuex的页面的实例
      // axios.post("/login", vm.ruleForm).then(res => {
      login(vm.ruleForm).then(res => {
        // console.log("登录结果",res)
        if (res.data.ok === 1) {
          sessionStorage.setItem('access_token', res.data.token);
          sessionStorage.setItem('routerRole', JSON.stringify(res.data.routerRole));
          var userData = {}
          userData.Id = res.data.userId//用户id
          userData.primaryIdentity = res.data.primaryIdentity//是否为一级管理员
          userData.secondaryIdentity = res.data.secondaryIdentity//是否为二级管理员
          sessionStorage.setItem('userData', JSON.stringify(userData));
          commit("CHANGE_TOKEN", {
            token: res.data.token
          });
          // vm.$message({
          //     message: data.msg,
          //     type: 'success'
          // });
          vm.$router.push({ path: '/NavigationA' });
          // vm.$router.replace({ path: '/' });
        } else {
          vm.$message.error(res.data.msg);
        }
      })
    }
  }
}
