import type { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export const AUTO_IMPORT = true
export default function setupElementPlus(app: App) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}
