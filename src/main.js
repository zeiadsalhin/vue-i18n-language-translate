import './assets/main.css'
import './assets/index.css'
import EN from './locale/en.json'
import AR from './locale/ar.json'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'


const i18n = createI18n({
    locale: document.cookie.split('=')[1] || "EN",
    fallbackLng: "AR",
    messages: {
        EN: EN,
        AR: AR,
    }
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
