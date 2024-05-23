import './assets/main.css'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

createApp(App).use(router).use(store).mount('#app')