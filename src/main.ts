import './styles/index.less'
import 'ybnav/dist/ybnav.css'
import { createApp, onBeforeUnmount } from 'vue'
import router from './router'
import App from './App.vue'
import SvgIcon from './components//svg-icon/index.vue'
import DText from './components/d-text/index.vue'
import fetch from '@/utils/fetch'
import './flexible'
import './assets/iconfont/iconfont'
import VConsole from 'vconsole'

const app = createApp(App)
app.component(SvgIcon.name, SvgIcon)
app.component(DText.name, DText)
app.use(router)
app.mount('#app')

app.config.globalProperties.$fetch = fetch

const showConsole = import.meta.env['VITE_console']
let vConsole: VConsole | null = null
if (showConsole) {
    vConsole = new VConsole()
}

onBeforeUnmount(() => {
    vConsole && vConsole.destroy()
})
