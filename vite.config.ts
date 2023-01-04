import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoComponents from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    // sourcemap: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '#': resolve(__dirname, './types')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia', { axios: [['default', 'axios']] }, { dayjs: [['default', 'dayjs']] }],
      dts: 'types/auto-imports.d.ts',
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver({ prefix: 'Icon' })
      ]
    }),
    AutoComponents({
      dirs: ['src/components'],
      directoryAsNamespace: true,
      dts: 'types/auto-components.d.ts',
      resolvers: [
        // 自动注册图标组件
        IconsResolver({ enabledCollections: ['ep'] }),
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ]
    }),
    Icons({ autoInstall: true })
  ]
})
