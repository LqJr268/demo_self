const state = {
  topNav: '',// 顶部导航

};

const mutations = {
  sureTopNav(state, topNav) {
    state.topNav = topNav;


  },
};

const actions = {
  getNav({ commit }, data) {
    commit("sureTopNav", data);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
