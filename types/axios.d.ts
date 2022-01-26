import { IResponse } from './axios.d'
/**
 * 接口返回
 */
export interface IResponse<T> {
    result: T = any;
    code: number;
    message: string;
}

export type Method = ''

export interface IResPage {
    current: number;
    data: Array<any>;
    size: number;
    total: number;
}

export interface Fetch {
    (url: string, params?: any, optiosn?: any): Promise<IResponse<any>>
} 