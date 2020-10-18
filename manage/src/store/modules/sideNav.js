
const state = {
  sideNav: '',// 顶部导航
};

const mutations = {
  sureSideNav(state, sideNav) {
    // console.log(sideNav)
    state.sideNav = sideNav;
  },
};

const actions = {
  getNav({ commit }, data) {
    // console.log(data)
    commit("sureSideNav", data);
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
