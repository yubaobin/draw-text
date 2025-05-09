/**
 * html模板注入变量
 */
import { createHtmlPlugin } from 'vite-plugin-html'

export function configHtmlPlugin (env: ViteEnv, isBuild: boolean) {
    const { VITE_appname, VITE_publicpath = '' } = env

    const baseUrl = VITE_publicpath.endsWith('/') ? VITE_publicpath : `${VITE_publicpath}/`

    const htmlPlugin = createHtmlPlugin({
        minify: isBuild,
        inject: {
            data: {
                title: VITE_appname,
                baseUrl: baseUrl || '/'
            }
        }
    })
    return htmlPlugin
}
