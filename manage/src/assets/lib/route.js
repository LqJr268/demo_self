let router = [
  {
    path: '/NavigationA',
    name: 'NavigationA',
    component: resolve => require(['@/views/navigationA'], resolve),
    // redirect: 'NavigationA/A-a',//**显示父路径 */
    redirect: '/A-a',
    meta: {
      id: [101, 102, 103],
      sort: 1,
      childrenPath: ['/A-a', '/A-b', '/A-c', '/EditSeries'],
      operateId: [],
      name: "顶部导航A",
      topShow: true//是否展示在顶栏
    },
    children: [
      {
        path: '/A-a',
        // path: 'A-a',//**显示父路径 */
        name: 'A-a',
        meta: {
          id: [101],
          sort: 1,
          operateId: [],
          needTop: true,//该页面是否需要顶栏
          needSide: true//该页面是否需要侧栏
        },
        component: resolve => require(['@/views/navigationAPage/A-a'], resolve)
      },
      {
        path: '/A-b',
        // path: 'A-b',//**显示父路径 */
        name: 'A-b',
        meta: {
          id: [102],
          sort: 2,
          operateId: [],
          needTop: true,//该页面是否需要顶栏
          needSide: true//该页面是否需要侧栏
        },
        component: resolve => require(['@/views/navigationAPage/A-b'], resolve)
      },
      {
        path: '/A-c',
        // path: 'A-c',//**显示父路径 */
        name: 'A-c',
        meta: {
          id: [103],
          sort: 3,
          operateId: [],
          needTop: true,//该页面是否需要顶栏
          needSide: true,//该页面是否需要侧栏
          keepAlive: true

        },
        component: resolve => require(['@/views/navigationAPage/A-c'], resolve)
      }
    ]
  },
  {
    path: '/navigationB',
    name: 'navigationB',
    component: resolve => require(['@/views/navigationB'], resolve),
    redirect: '/B-a',
    meta: {
      id: [201, 202, 203, 204, 205],
      sort: 2,
      childrenPath: ['/B-a', '/B-b', '/B-c', '/B-d', '/B-e'],
      operateId: [],
      name: "顶部导航B",
      topShow: true//是否展示在顶栏
    },
    children: [
      {
        path: '/B-a',
        name: 'B-a',
        meta: {
          id: [201],
          sort: 1,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationBPage/B-a'], resolve) // 图片管理
      },
      {
        path: '/B-b',
        name: 'B-b',
        meta: {
          id: [202],
          sort: 2,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationBPage/B-b'], resolve)
      },
      {
        path: '/B-c',
        name: 'B-c',
        meta: {
          id: [203],
          sort: 3,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationBPage/B-c'], resolve)
      },
      {
        path: '/B-d',
        name: 'B-d',
        meta: {
          id: [204],
          sort: 4,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationBPage/B-d'], resolve)
      },
      {
        path: '/B-e',
        name: 'B-e',
        meta: {
          id: [205],
          sort: 5,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationBPage/B-e'], resolve)
      }
    ]
  },
  {
    path: '/navigationC',
    name: 'navigationC',
    component: resolve => require(['@/views/navigationC'], resolve),
    meta: {
      id: [300],
      sort: 3,
      operateId: [],
      name: "顶部导航C",
      topShow: true,//是否展示在顶栏
      needTop: true,
      needSide: false
    },
    children: []
  },
  {
    path: '/navigationD',
    name: 'navigationD',
    component: resolve => require(['@/views/navigationD'], resolve),
    meta: {
      id: [400],
      sort: 4,
      operateId: [],
      name: "顶部导航D",
      topShow: true,//是否展示在顶栏
      needTop: true,
      needSide: false
    },
    children: []
  },
  {
    path: '/navigationE',
    name: 'navigationE',
    component: resolve => require(['@/views/navigationE'], resolve),
    meta: {
      id: [500],
      sort: 5,
      operateId: [],
      name: "顶部导航E",
      topShow: true,//是否展示在顶栏
      needTop: true,
      needSide: false
    },
    children: []
  },
  {
    path: '/navigationF',
    name: 'navigationF',
    component: resolve => require(['@/views/navigationF'], resolve),
    meta: {
      id: [600],
      sort: 6,
      operateId: [],
      name: "顶部导航F",
      topShow: true,//是否展示在顶栏
      needTop: true,
      needSide: false
    },
    children: []
  },
  {
    path: '/navigationG',
    name: 'navigationG',
    component: resolve => require(['@/views/navigationG'], resolve),
    meta: {
      id: [700],
      sort: 7,
      operateId: [],
      name: "顶部导航G",
      topShow: true,//是否展示在顶栏
      needTop: true,
      needSide: false
    },
    children: []
  },
  {
    path: '/navigationH',
    name: 'navigationH',
    component: resolve => require(['@/views/navigationH'], resolve),
    meta: {
      id: [800],
      sort: 8,
      operateId: [],
      name: "顶部导航H",
      topShow: true,//是否展示在顶栏
      needTop: true,
      needSide: false
    },
    children: []
  },
  {
    path: '/navigationI',
    name: 'navigationI',
    component: resolve => require(['@/views/navigationI'], resolve),
    meta: {
      id: [900],
      sort: 9,
      operateId: [],
      name: "顶部导航I",
      topShow: true,//是否展示在顶栏
      needTop: true,
      needSide: false
    },
    children: []
  },
  {
    path: '/navigationJ',
    name: 'navigationJ',
    component: resolve => require(['@/views/navigationJ'], resolve),
    redirect: '/J-a',
    meta: {
      id: [1001, 1002, 1003],
      sort: 10,
      childrenPath: ['/J-a', '/J-b', '/J-c'],
      operateId: [],
      name: "顶部导航J",
      topShow: true,//是否展示在顶栏
    },
    children: [
      {
        path: '/J-a',
        name: 'J-a',
        meta: {
          id: [1001],
          sort: 1,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationJPage/J-a'], resolve)
      },
      {
        path: '/J-b',
        name: 'J-b',
        meta: {
          id: [1002],
          sort: 2,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationJPage/J-b'], resolve)
      },
      {
        path: '/J-c',
        name: 'J-c',
        meta: {
          id: [1003],
          sort: 3,
          operateId: [],
          needTop: true,
          needSide: true
        },
        component: resolve => require(['@/views/navigationJPage/J-c'], resolve)
      }
    ]
  },
  {
    path: '/editProfile',
    name: 'editProfile',
    component: resolve => require(['@/views/editProfile'], resolve),
    meta: {
      id: [1100],
      sort: 11,
      operateId: [],
      name: "editProfile",
      needTop: false,
      needSide: false,
      topShow: false
    },
    children: []
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: resolve => require(['@/views/changePassword'], resolve),
    meta: {
      id: [1200],
      sort: 12,
      operateId: [],
      name: "changePassword",
      needTop: false,
      needSide: false,
      topShow: false
    },
    children: []
  },
  {
    path: '/help',
    name: 'help',
    component: resolve => require(['@/views/help'], resolve),
    meta: {
      id: [1300],
      sort: 13,
      operateId: [],
      name: "help",
      needTop: false,
      needSide: false,
      topShow: false
    },
    children: []
  },
  {
    path: '/EditSeries',
    name: 'EditSeries',
    component: resolve => require(['@/views/EditSeries'], resolve),
    meta: {
      id: [1400],
      sort: 14,
      operateId: [],
      name: "EditSeries",
      needTop: true,
      needSide: false,
      topShow: false
    },
    children: []
  },
]

// 404
let unfRouter = {
  path: '*',
  redirect: '/404',
  meta: {

  }
};

let getRouter = () => {
  let routeList = [];
  let routerRole = JSON.parse(sessionStorage.getItem("routerRole"));

  let childHasItem = []
  let num = 0

  routerRole.map(item => {//遍历权限
    // console.log(item)
    router.map(navItem => {//遍历总表
      if (!navItem.children.length) {
        //不存在子路由
        if (navItem.meta.id.indexOf(item.id) !== -1) {
          routeList.push(navItem);
          num = 0;
        }
      } else {
        //存在子路由
        if (navItem.meta.id.indexOf(item.id) !== -1) {
          // console.log("子路由检测到权限")
          if (routeList.length) {
            // console.log("不是第一次存储")
            routeList.map(routeListItem => {//遍历已有表
              if (routeListItem.meta.id.indexOf(item.id) !== -1) {
                // console.log("上级已存储",item.id,num)
                navItem.children.map(navItemChild => {//遍历子表
                  if (navItemChild.meta.id.indexOf(item.id) !== -1) {
                    routeListItem.children.push(navItemChild)
                    routeListItem.children.sort(sortNumber)
                  }
                })
                num = 0
              } else {
                num++;
              }
            })

            // console.log(num,routeList)

            if (num === routeList.length) {
              // console.log("上级还未存储",item.id,num)
              childHasItem = Object.assign({}, navItem)
              childHasItem.children = []
              navItem.children.map(navItemChild => {//遍历子表
                if (navItemChild.meta.id.indexOf(item.id) !== -1) {
                  childHasItem.children.push(navItemChild)
                  childHasItem.children.sort(sortNumber)
                }
              })
              routeList.push(childHasItem);
              num = 0
            }
          } else {
            // console.log("首次存储",item.id,num)
            childHasItem = Object.assign({}, navItem)
            childHasItem.children = []
            navItem.children.map(navItemChild => {//遍历子表
              if (navItemChild.meta.id.indexOf(item.id) !== -1) {
                childHasItem.children.push(navItemChild)
              }
            })
            routeList.push(childHasItem);
          }
        } else {
          // console.log("子路由没有检测到权限")
          num = 0
        }
      }
    });
  });

  routeList.sort(sortNumber)

  routeList.push(unfRouter);

  // console.log('当前所有路由: ', routeList);
  return routeList;

  function sortNumber(a, b) {
    return a.meta.sort - b.meta.sort
  }

};

export {
  getRouter
};
