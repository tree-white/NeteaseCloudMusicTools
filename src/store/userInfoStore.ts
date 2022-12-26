import utils from '@/common/utils'

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
    setUserInfo(info: Partial<LoginQrCheck>) {
      Object.assign(this.info, info)
      utils.saveStorage('userInfo', this.info)
    }
  }
})
