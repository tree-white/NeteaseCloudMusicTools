import utils from '@/common/utils'
export default defineStore('system', {
  state: () => ({
    env: _initialEnv()
  }),
  getters: {
    baseUrl(state) {
      return state.env.VITE_BASE_URL || '/'
    }
  },
  actions: {
    setEnvBaseUrl(url: string) {
      if (!url) return
      const localEnv = utils.getStorage<ImportMetaEnv>('env') || ({} as ImportMetaEnv)
      localEnv.VITE_BASE_URL = url
      utils.saveStorage('env', localEnv)
      this.env = _initialEnv()
    },
    resetSystemConfig() {
      utils.removeStorage('env')
      this.env = _initialEnv()
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
