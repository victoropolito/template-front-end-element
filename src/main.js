import './assets/main.css'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Element
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

createApp(App).use(ElementPlus).use(router).use(store).mount('#app')