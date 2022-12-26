import type { App } from 'vue'

export const AUTO_IMPORT = true
export default function setupPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}
