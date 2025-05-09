import './styles/index.less'
import { createApp } from 'vue'
import { router, setupRouter } from './router'
import App from './App.vue'
import './flexible'

async function bootstrap () {
    const app = createApp(App)
    setupRouter(app)
    await router.isReady()
    app.mount('#app', true)
}

bootstrap()

const isProduction = import.meta.env.MODE === 'production'

if (isProduction) {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?29f479ad1a28ef790cdf0e48b3fbf4e8'
    const s = document.getElementsByTagName('script')[0]
    if (s && s.parentNode) {
        s.parentNode.insertBefore(hm, s)
    }
}
