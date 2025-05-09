import type { IResponse } from '#/axios'
import fetch from '@/utils/http-fetch'

const baseUrl = '/api/v2/text'
export const textApi = {
    addText (params?: any): Promise<IResponse<any>> {
        return fetch(`${baseUrl}`, params, { method: 'post' })
    },
    deleteText (id: string): Promise<IResponse<any>> {
        return fetch(`${baseUrl}/${id}`, {}, { method: 'delete' })
    },
    getTextById (id: string): Promise<IResponse<any>> {
        return fetch(`${baseUrl}/${id}`, {}, { method: 'get' })
    }
}
