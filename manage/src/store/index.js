import Vue from 'vue'
import Vuex from 'vuex'

import topNav from './modules/topNav';
import sideNav from './modules/sideNav';

import admin from './modules/admin';


Vue.use(Vuex)

export default new Vuex.Store({
  // state: {
  // },
  // mutations: {
  // },
  // actions: {
  // },
  modules: {
    topNav,
    sideNav,
    admin
  }
})
