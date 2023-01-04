import utils from '@/common/utils'
import { router } from '@/router'

export default defineStore('userInfoStore', {
  state: () => ({
    info: utils.getStorage<IUserInfo>('userInfo') || ({} as IUserInfo)
  }),
  getters: {
    cookie(state) {
      return state.info.cookie
    },
    nickname(state) {
      return state.info.nickname
    }
  },
  actions: {
    /** 设置用户信息 */
    setUserInfo(info: Partial<IUserInfo>) {
      Object.assign(this.info, info)
      utils.saveStorage('userInfo', this.info)
    },
    /** 注销/退出登录 */
    logout() {
      utils.removeStorage('userInfo')
      this.info = {} as IUserInfo
      router.push('/login')
    }
  }
})
