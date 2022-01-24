import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import { resolve } from 'path'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
const isProduction = process.env.NODE_ENV === 'production'

console.log('生产环境', isProduction)

function pathResolve (dir: string) {
	return resolve(process.cwd(), '.', dir)
}
export default ({ mode }: ConfigEnv): UserConfigExport => {
	const root = process.cwd()
	const env = loadEnv(mode, root)
	const viteEnv = wrapperEnv(env)
	const { VITE_outputdir, VITE_publicpath, VITE_port, VITE_proxy, VITE_drop_console } = viteEnv
	return defineConfig({
		base: VITE_publicpath,
		root,
		resolve: {
			alias: [
				{
					find: /^@\//,
					replacement: pathResolve('src') + '/'
				},
				{
					find: /^components\//,
					replacement: pathResolve('src/components') + '/'
				}
			]
		},
		server: {
			host: true,
			port: VITE_port || '3000',
			proxy: createProxy(VITE_proxy)
		},
		build: {
			target: 'es2015',
			outDir: VITE_outputdir || 'dist',
			terserOptions: {
				compress: {
					keep_infinity: true,
					drop_console: VITE_drop_console
				}
			},
			brotliSize: false,
			chunkSizeWarningLimit: 2000
		},
		css: {
			preprocessorOptions: {
				less: {
					modifyVars: {
						hack: `true; @import "${resolve('src/styles/variables.less')}";`
					},
					javascriptEnabled: true
				}
			}
		},
		plugins: [
			vue(),
			styleImport({
				resolves: [VantResolve()]
			})
		]
	})
}


