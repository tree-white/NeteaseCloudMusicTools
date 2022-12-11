import { RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router'
import utils from '@/common/utils'

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
    const info = utils.getStorage('userInfo')
    console.log('>>>>>> info=>', info)
    console.log('>>>>>> to=>', to)
    console.log('>>>>>> from=>', from)
    if (to.path !== '/login' && !info) next({ path: '/login' })
    else next()
  }
}
