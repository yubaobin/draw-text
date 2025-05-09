import type { Drop } from './node_modules/esbuild/lib/main'
import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugins/index'

export default ({ command, mode }: ConfigEnv) => {
    console.log(mode)
    const root = process.cwd()
    const env = loadEnv(mode, root)
    const viteEnv = wrapperEnv(env)
    const isBuild = command === 'build'

    const { VITE_outputdir, VITE_publicpath, VITE_port, VITE_drop_console } = viteEnv

    const buildDrop: Drop[] = ['debugger']
    if (VITE_drop_console) {
        buildDrop.push('console')
    }

    return defineConfig({
        base: VITE_publicpath.endsWith('/') ? VITE_publicpath : `${VITE_publicpath}/`,
        root,
        plugins: createVitePlugins(viteEnv, isBuild),
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                'components': fileURLToPath(new URL('./components', import.meta.url)),
                '#': fileURLToPath(new URL('./types', import.meta.url))
            }
        },
        server: {
            host: true,
            port: VITE_port || '3000',
            proxy: createProxy([])
        },
        esbuild: {
            drop: buildDrop
        },
        build: {
            target: 'es2015',
            cssTarget: ['chrome79'],
            sourcemap: false,
            outDir: VITE_outputdir || 'dist',
            minify: 'esbuild'
        },
        css: {
            preprocessorOptions: {
                less: {
                    modifyVars: {
                        hack: 'true; @import "@/styles/variables.less";'
                    }
                }
            }
        }
    })
}


