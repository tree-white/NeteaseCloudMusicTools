import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    redirect: '/cloud'
  }
]

/** 自动导入默认index路由 */
const ctx = import.meta.glob('@/views/*/index.vue')
Object.keys(ctx).forEach(path => {
  const name = path.replace(/.*views\/(.*)\/index\.vue$/, '$1')
  routes.push({ path: '/' + name, name, component: ctx[path] })
})
export default routes
