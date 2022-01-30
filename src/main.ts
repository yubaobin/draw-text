import './styles/index.less'
import 'ybnav/dist/ybnav.css'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import SvgIcon from './components//svg-icon/index.vue'
import DText from './components/d-text/index.vue'
import fetch from '@/utils/fetch'
import './flexible'
import './assets/iconfont/iconfont'

const app = createApp(App)
app.component(SvgIcon.name, SvgIcon)
app.component(DText.name, DText)
app.use(router)
app.mount('#app')

app.config.globalProperties.$fetch = fetch

const isProduction = process.env.NODE_ENV === 'production'
if (isProduction) {
    const hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?29f479ad1a28ef790cdf0e48b3fbf4e8'
    const s = document.getElementsByTagName('script')[0] 
    if (s && s.parentNode) {
        s.parentNode.insertBefore(hm, s)
    }
}
