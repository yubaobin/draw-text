import fetch from '@/utils/fetch'
import { IResponse } from 'types/axios'
export const authApi = {
    authWx (): Promise<IResponse<any>> {
        return fetch('/wx/getSignature', {}, { method: 'get', local: true })
    }
}
