import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import setupRouter from './router'
import '@/plugins/tailwindcss/tailwindcss.scss'

const app = createApp(App)

setupRouter(app)

app.mount('#app')
