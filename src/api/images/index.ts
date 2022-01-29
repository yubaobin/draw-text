import fetch from '@/utils/fetch'
import { IResponse, IResPage } from 'types/axios'
const baseUrl = '/api/v2/image'
export const imageApi = {
	addImage (params?: any): Promise<IResponse<any>> {
		return fetch(`${baseUrl}`, params, { method: 'post' })
	},
	deleteImage (id: string): Promise<IResponse<any>> {
		return fetch(`${baseUrl}/${id}`, {}, { method: 'delete' })
	},
	getImageListByPage (params?: any): Promise<IResponse<IResPage>> {
		return fetch(`${baseUrl}/listByPage`, params, { method: 'get' })
	},
	getImageListByList (params?: any): Promise<IResponse<any>> {
		return fetch(`${baseUrl}/list`, params, { method: 'get' })
	},
	upload (params: any): Promise<IResponse<any>> {
		return fetch(`${baseUrl}/upload`, params, { method: 'upload' })
	},
	analyze (params: any): Promise<IResponse<any>> {
		return fetch(`${baseUrl}/analyze`, params, { method: 'upload' })
	}
}
