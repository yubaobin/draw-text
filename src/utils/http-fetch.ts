/**
 * 封装请求
 */
import type { IResponse } from '#/axios'
import axios from 'axios'
import qs from 'qs'
import { deleteNullByEquals } from '@/utils/index'
import config from '@/config'

const instance = axios.create({
    method: 'post',
    timeout: 25000,
    headers: {
        Accept: '*',
        'Content-Type': 'application/json'
    }
})

instance.interceptors.response.use(
    function (res) {
        return res.data
    },
    function (err) {
        return Promise.reject(err)
    }
)

// 拦截请求
instance.interceptors.request.use(
    function (req) {
        req.headers.token = Date.now()
        return req
    },
    function (err) {
        return Promise.reject(err)
    }
)

export { instance }

export default async (uri: string = '', query: any = {}, option: any = {}): Promise<IResponse<any>> => {
    if (!uri) {
        return Promise.reject('params "url" not exist！')
    }
    let url: string = uri
    if (!option.local) {
        url = config.apiPath + uri
    }
    const params: any = deleteNullByEquals(query)
    const method = option.method || 'post'
    switch (method) {
        case 'get':
            return instance.get(url, {
                params: params,
                ...option
            })
        case 'upload':
            return instance.post(url, params, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        case 'download':
            return instance.post(url, params, {
                responseType: 'blob'
            })
        case 'postForm':
            return instance.post(url, qs.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        case 'postQuery':
            return instance.post(url, null, Object.assign(option, { params }))
        case 'post':
            return instance.post(url, params, option)
        case 'put':
            return instance.put(url, params, option)
        case 'patch':
            return instance.patch(url, params, option)
        case 'delete':
            return instance.delete(url, {
                params: params
            })
        default:
            return Promise.reject(`unknown request method '${method}'`)
    }
}
