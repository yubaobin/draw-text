import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'

export function configVantPlugin () {
    return [
        AutoImport({
            resolvers: [VantResolver()],
            dts: false
        }),
        Components({
            resolvers: [VantResolver()],
            dts: false
            
        })
    ]
}