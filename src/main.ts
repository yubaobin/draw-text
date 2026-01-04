import './styles/index.less'
import { createApp } from 'vue'
import { router, setupRouter } from './router'
import App from './App.vue'
import './flexible'
import { AnalyticsSDK } from 'ux-analytics-sdk'

const analyticsSdk = new AnalyticsSDK({
    endpoint: `${import.meta.env.VITE_apipath}/api/v2`,
    appSecret: import.meta.env.VITE_appSecret,
    autoTrack: { click: { enable: false } }
})

async function bootstrap () {
    analyticsSdk.init()
    const app = createApp(App)
    setupRouter(app)
    await router.isReady()
    app.mount('#app', true)
}

bootstrap()
