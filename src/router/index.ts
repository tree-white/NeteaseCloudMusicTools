import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import Guard from './Guard'

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default function setupRouter(app: App) {
  new Guard(router)
  app.use(router)
}
