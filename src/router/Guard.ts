import userInfoStore from '@/store/userInfoStore'
import { RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'

/**
 * 路由守卫
 */
export default class Guard {
  constructor(private router: Router) {
    this.run(router)
  }

  // 执行路由守卫
  private async run(router: Router) {
    router.beforeEach(this.beforeEach.bind(this))
  }

  // 路由拦截
  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (to.path !== '/login' && !userInfoStore().cookie) next({ path: '/login' })
    else next()
  }
}
