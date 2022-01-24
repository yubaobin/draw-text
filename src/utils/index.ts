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