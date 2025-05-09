/**
 * 接口返回
 */
export interface IResponse<T = any> {
    result: T;
    code: number;
    message: string;
}

/**
 * 分页
 */
export interface PageQuery {
    current: number;
    size: number;
}

export interface IResPage<T = any> {
    current: number;
    data: Array<T>;
    size: number;
    total: number;
}
