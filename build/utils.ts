import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

export function isDevFn (mode: string): boolean {
    return mode === 'development'
}

export function isProdFn (mode: string): boolean {
    return mode === 'production'
}

/**
 * Whether to generate package preview
 */
export function isReportMode (): boolean {
    return process.env.REPORT === 'true'
}

// Read all environment variable configuration files to process.env
export function wrapperEnv (envConf: Recordable): ViteEnv {
    const ret: any = {}

    for (const envName of Object.keys(envConf)) {
        let realName = envConf[envName].replace(/\\n/g, '\n')
        realName = realName === 'true' ? true : realName === 'false' ? false : realName

        if (envName === 'VITE_port') {
            realName = Number(realName)
        }
        ret[envName] = realName != null ? realName : ''
        if (typeof realName === 'string') {
            process.env[envName] = realName
        } else if (typeof realName === 'object') {
            process.env[envName] = JSON.stringify(realName)
        }
    }
    return ret
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles () {
    const script = process.env.npm_lifecycle_script
    const reg = new RegExp('--mode ([a-z]+)')
    const result = reg.exec(script as string) as any
    if (result) {
        const mode = result[1] as string
        return ['.env', `.env.${mode}`]
    }
    return ['.env', '.env.production']
}

/**
 * Get the environment variables starting with the specified prefix
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig (match = 'VITE_GLOB_', confFiles = getConfFiles()) {
    let envConfig = {}
    confFiles.forEach((item) => {
        try {
            const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)))
            envConfig = {...envConfig, ...env}
        } catch (e) {
            console.error(`Error in parsing ${item}`, e)
        }
    })
    const reg = new RegExp(`^(${match})`)
    Object.keys(envConfig).forEach((key) => {
        if (!reg.test(key)) {
            Reflect.deleteProperty(envConfig, key)
        }
    })
    return envConfig
}

/**
 * Get user root directory
 * @param dir file path
 */
export function getRootPath (...dir: string[]) {
    return path.resolve(process.cwd(), ...dir)
}
