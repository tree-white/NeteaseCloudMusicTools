import type { App } from 'vue'

export default function setupPlugins(app: App) {
  const ctx: any = import.meta.glob('./[^axios]*/*.ts', { eager: true })
  Object.keys(ctx).forEach(path => ctx[path].AUTO_IMPORT && ctx[path].default(app))
}
