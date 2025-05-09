function getPath(name: string) {
    return import.meta.env[`VITE_${name}`] ? import.meta.env[`VITE_${name}`] : ''
}

export default {
    apiPath: getPath('apipath')
}
