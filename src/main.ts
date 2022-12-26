import { createApp } from 'vue'
import App from './App.vue'
import setupRouter from './router'
import setupPlugins from './plugins'

async function bootstrap() {
  const app = createApp(App)

  setupRouter(app)
  setupPlugins(app)

  app.mount('#app')
}

bootstrap()
