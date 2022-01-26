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
