export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: 'login',
        component: './user/login',
      },
      {
        component: './404',
      },
    ],
  },
  // exception
  {
    path: '/exception',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/exception/403',
        name: 'not-permission',
        component: './exception/403',
      },
      {
        path: '/exception/404',
        name: 'not-find',
        component: './exception/404',
      },
      /*{
        path: '/exception/500',
        name: 'server-error',
        component: './exception/500',
      },*/
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            // authority: ['user'],
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            // authority: ['admin', 'user'],
            component: './Welcome',
          },
          {
            path: '/Notice',
            name: 'notice',
            authority: ['user'],
            icon: 'tool',
            component: './Notice',
          },
          {
            path: '/dashboard',
            name: 'dashboard',
            icon: 'dashboard',
            // authority: ['admin', 'user'],
            routes: [
              {
                path: '/dashboard/analysis',
                name: 'analysis',
                icon: 'smile',
                authority: ['admin'],
                component: './dashboard/Analysis',
              },
              {
                path: '/dashboard/monitor',
                name: 'monitor',
                icon: 'smile',
                // authority: ['user'],
                component: './dashboard/Monitor',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
