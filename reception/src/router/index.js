import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'first',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/first.vue'),
    meta: {
      needTop: true,//该页面是否需要顶栏
      needBottom: true,//该页面是否需要底栏
      keepAlive: true
    },
  },
  {
    path: '/second',
    name: 'second',
    component: () => import('../views/second.vue'),
    meta: {
      needTop: true,//该页面是否需要顶栏
      needBottom: true,//该页面是否需要底栏
      keepAlive: false
    },
  },
  {
    path: '/third',
    name: 'third',
    component: () => import('../views/third.vue'),
    meta: {
      needTop: true,//该页面是否需要顶栏
      needBottom: true,//该页面是否需要底栏
      keepAlive: false
    },
  },
  {
    path: '/forth',
    name: 'forth',
    component: () => import('../views/forth.vue'),
    meta: {
      needTop: false,//该页面是否需要顶栏
      needBottom: true,//该页面是否需要底栏
      keepAlive: false
    },
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: () => import('../views/goodsDetail.vue'),
    meta: {
      needTop: false,//该页面是否需要顶栏
      needBottom: false,//该页面是否需要底栏
      keepAlive: false
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
