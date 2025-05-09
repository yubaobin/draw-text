import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { configHtmlPlugin } from './html'
import { configVantPlugin } from './vant'

export function createVitePlugins (viteEnv: ViteEnv, isBuild: boolean) {
    const vitePlugins = [
        vue(),
        vueJsx(),
        vueDevTools(),
        configHtmlPlugin(viteEnv, isBuild),
        ...configVantPlugin()
    ]
    return vitePlugins
}