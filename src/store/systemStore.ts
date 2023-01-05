import utils from '@/common/utils'
export default defineStore('system', {
  state: () => ({
    env: _initialEnv()
  }),
  getters: {
    baseUrl(state) {
      return state.env.CUSTOM_BASE_URL || state.env.VITE_BASE_URL || '/'
    },
    useRealIp(state) {
      return state.env.VITE_USE_REAL_IP
    },
    realIp(state) {
      return state.env.VITE_REAL_IP
    },
    coolingTime(state) {
      return +state.env.VITE_CAPTCHA_COOLING_TIME
    },
    reserveUrl(state) {
      return state.env.VITE_BASE_RESERVE_URL.split(',')
    }
  },
  actions: {
    resetSystemConfig() {
      utils.removeStorage('env')
      this.env = _initialEnv()
    },

    saveEnvParams(params: Partial<ImportMetaEnv> = {}) {
      if (!Object.keys(params).length) return
      const localEnv = utils.getStorage<ImportMetaEnv>('env') || ({} as ImportMetaEnv)
      utils.saveStorage('env', Object.assign(localEnv, params))
      this.env = _initialEnv()
    },

    nextReserveUrl() {
      const index = this.reserveUrl.findIndex(url => url === this.env.VITE_BASE_URL)
      if ([-1, this.reserveUrl.length - 1].includes(index)) {
        return this.reserveUrl[0]
      } else {
        return this.reserveUrl[index + 1]
      }
    }
  }
})

function _initialEnv(): ImportMetaEnv {
  const conversion: Record<string, any> = { true: true, false: false, undefined: undefined, null: null }
  const defaultEnv = import.meta.env
  Object.keys(defaultEnv).forEach((key: string) => {
    if (key.includes('VITE') && conversion.hasOwnProperty(defaultEnv[key])) {
      defaultEnv[key] = conversion[defaultEnv[key]]
    }
  })

  const localEnv = utils.getStorage<ImportMetaEnv>('env') || ({} as ImportMetaEnv)

  return { ...defaultEnv, ...localEnv }
}
