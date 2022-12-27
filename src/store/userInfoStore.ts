import utils from '@/common/utils'

const router = useRouter()
export default defineStore('userInfoStore', {
  state: () => ({
    info: utils.getStorage<LoginQrCheck>('userInfo') || ({} as LoginQrCheck)
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
    setUserInfo(info: Partial<LoginQrCheck>) {
      Object.assign(this.info, info)
      utils.saveStorage('userInfo', this.info)
    },
    /** 注销/退出登录 */
    logout() {
      utils.removeStorage('userInfo')
      this.info = {} as LoginQrCheck
      router.push('/login')
    }
  }
})
