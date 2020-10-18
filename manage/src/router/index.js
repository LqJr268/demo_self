/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'

// 解决Vue-Router升级导致的Uncaught(in promise) navigation guard问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

import store from '../store';
import { getRouter } from '@/assets/lib/route';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/NavigationA'
  },
  {
    path: '/Login',
    name: 'Login',
    component: resolve => require(['@/views/Login'], resolve),
    meta: {
      // topShow: true,//是否展示在顶栏
      // needTop: true,
      // needSide: true
    },
  },
  {
    path: '/404',
    name: '404',
    component: resolve => require(['@/views/404.vue'], resolve),
    meta: {
      // topShow: true,//是否展示在顶栏
      // needTop: true,
      // needSide: true
    }
  },
  {//个人记录--页面传值
    // path: '/parameter/:id',//parameter/12
    path: '/parameter',//parameter?v1=666&v2=222
    name: 'parameter',
    component: resolve => require(['@/views/parameter.vue'], resolve),
    meta: {
      // topShow: true,//是否展示在顶栏
      // needTop: true,
      // needSide: true
    },
  },
  {//个人记录--watch&computed
    path: '/watchAComputed',
    name: 'watchAComputed',
    component: resolve => require(['@/views/watchAComputed.vue'], resolve),
    meta: {
      // topShow: true,//是否展示在顶栏
      // needTop: true,
      // needSide: true
    },
  },
]

// 重置当前路由当中动态追加的路由
export const resetRouter = () => {
  router.matcher = new VueRouter({
    mode: 'history',
    routes
  }).matcher;
};

// 路由模式
const router = new VueRouter({
  mode: 'history',
  // mode: 'hash',
  //hash: location对象 url地址栏的内容拆分对象实现
  //history: html的history-api实现
  base: process.env.BASE_URL,
  routes
})

//hash:
//http://localhost:8080/#/B-a?v1=1  #后的部分变化不会向服务器重新请求网站资源 和 重载vue实例
//history:
//http://localhost:8080/A-a?v1=1  非router-link跳转 例如手动修改地址栏产生任何变化时 会向服务器重新请求网站资源 和 重载vue实例
//继而 使用history模式路由开发的vue项目 部署的时候服务器需要做相应适配 即每次收到浏览器的资源请求都要返回全部

//******动态路由addRoutes是vue-router提供的  但是动态地请求组件component: resolve => require(['@/views/watchAComputed.vue'], resolve)的操作是webpack提供的 */

let isDynamicRoutesMounted = false;//记录路由表是否挂载过
router.beforeEach((to, from, next) => {
  // console.log('-------------------------------');
  // console.log('from: ', from);
  // console.log('to: ', to);
  const identity = sessionStorage.getItem('access_token');//记录本地是否已存有身份信息
  // console.log('token', identity);
  if (identity) {
    if (!isDynamicRoutesMounted) {
      console.log('③ 已登录, 未挂载动态路由, 挂载');
      router.addRoutes(getRouter());
      isDynamicRoutesMounted = true;
      //****************************************** */
      //进行顶栏要渲染模块数据的填充
      var topData = []
      getRouter().map((item) => {
        if (item.meta.topShow) {
          topData.push(item);
        }
      });
      store.dispatch('topNav/getNav', topData)
      //vuex存值的一种方式 this.$store.dispatch()
      //****************************************** */
      next({ ...to, replace: true })
    } else {
      console.log('④ 已登录, 已挂载动态路由, 放行');
      if (to.path === '/Login') {
        console.log('⑤ 已登录, 已挂载动态路由, 不能去往login');
        next({ path: '/NavigationA', replace: true })
      } else {
        next();
      }
    }
  } else {
    isDynamicRoutesMounted = false;
    if (to.path === '/Login') {
      console.log('② 未登录, 打开的是login');
      next()
    } else {
      console.log('① 未登录, 重定向到login');
      next({ path: '/Login', replace: true })
    }
  }
})
export default router
