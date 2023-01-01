import utils from '@/common/utils'
export default defineStore('system', {
  state: () => ({
    env: _initialEnv()
  }),
  getters: {
    baseUrl(state) {
      return state.env.VITE_BASE_URL || '/'
    },
    useRealIp(state) {
      return state.env.VITE_USE_REAL_IP
    },
    realIp(state) {
      return state.env.VITE_REAL_IP
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
      console.log('>>>>>> this.env=>', JSON.parse(JSON.stringify(this.env)))
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
