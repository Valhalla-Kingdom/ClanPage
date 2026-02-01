import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // Importe o router

const app = createApp(App)

app.use(router) // Use o router
app.mount('#app')