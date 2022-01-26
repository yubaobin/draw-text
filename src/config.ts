function getPath (name: string) {
    window._CONFIG = window._CONFIG || {}
    return window._CONFIG[name] ? window._CONFIG[name] : (import.meta.env[`VITE_${name}`] ? import.meta.env[`VITE_${name}`] : '')
}

export default {
    apiPath: getPath('apipath')
}