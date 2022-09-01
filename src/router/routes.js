
const routes = [
  {
    path: '/',
    redirect: to => {
      return { path: '/home' }
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', name: 'dashboard', auth: true, component: () => import('pages/IndexPage.vue') },
      { path: 'users', name: 'users', auth: true, component: () => import('pages/users/users.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    auth: false,
    component: () => import('pages/users/login.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    auth: false,
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
