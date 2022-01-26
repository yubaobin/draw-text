import { Ref, unref } from 'vue'

/**
 * 获取ref对象
 * @param vm Vue组件
 * @param name ref
 * @returns promise
 */
export function getRefPromise<T> (vm: Ref<T>): Promise<T> {
	return new Promise((resolve) => {
		(function next () {
			if (vm.value) {
				resolve(unref(vm))
			} else {
				setTimeout(() => {
					next()
				}, 10)
			}
		})()
	})
}

/**
 * 防抖
 * @param {function} fun
 * @param {number} delay
 */
export const debounce = (fun: any, delay: number): any => {
	return (args: any) => {
		window.clearTimeout(fun.id)
		fun.id = window.setTimeout(() => {
			fun.call(this, args)
		}, delay)
	}
}

/**
 * 获取数据类型
 */
 export function getTypeOf (obj: any): (string | null) {
	const matchStr = Object.prototype.toString.call(obj).match(/\s+(\w+)/)
	return matchStr ? matchStr[1].toLocaleLowerCase() : ''
}

/**
 * 删除无效值
 * @param params 
 * @returns 
 */
export function deleteNullByEquals (params: any) {
	if (getTypeOf(params) === 'formdata') {
		return params
	} else {
		let result: any = {}
		for (const key in params) {
			if (!(/.quals/g.test(key) && !params[key] && params[key] !== 0)) {
				if (getTypeOf(params[key]) === 'object') {
					if (params[key]) {
						result[key] = deleteNullByEquals(params[key])
					} else {
						result[key] = params[key]
					}
				} else {
					result[key] = params[key]
				}
			}
		}
		return result
	}
}
