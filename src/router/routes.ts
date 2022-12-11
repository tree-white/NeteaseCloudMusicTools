import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/views/home.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]

export default routes
