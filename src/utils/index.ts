import type { Ref } from 'vue'
import { unref } from 'vue'
import { showToast } from 'vant'
/**
 * 获取ref对象
 * @param vm Vue组件
 * @param name ref
 * @returns promise
 */
export function getRefPromise<T> (vm: Ref<T>): Promise<T> {
    return new Promise((resolve) => {
        ;(function next () {
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
export function getTypeOf (obj: any): string | null {
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
        const result: any = {}
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

/**
 * 获取URL的query参数
 * @param uri 地址
 * @returns 参数对象
 */
export const parseUrl = (uri?: string) => {
    let url: string = uri || window.location.href
    const i: number = url.indexOf('?')
    const indexHash: number = url.indexOf('#')
    if (i === -1) return {}
    if (i < indexHash) url = url.slice(0, indexHash)
    const querystr: string = url.substr(i + 1)
    const arr1: Array<any> = querystr.split('&')
    const arr2: any = {}
    for (const key in arr1) {
        const ta = arr1[key].split('=')
        arr2[ta[0]] = ta[1]
    }
    return arr2
}

export const copyToClipboard = (url?: string) => {
    const copyText = url || window.location.href
    const el = document.createElement('textarea')
    el.value = copyText
    el.setAttribute('readonly', '')
    el.style.position = 'absolute'
    el.style.left = '-9999px'
    document.body.appendChild(el)

    const selection = document.getSelection()

    if (!selection) {
        return
    }

    const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false

    el.select()
    const result = document.execCommand('copy')
    document.body.removeChild(el)

    if (selected) {
        selection.removeAllRanges()
        selection.addRange(selected)
    }
    if (result) {
        showToast({ message: '复制成功' })
    }
}

export function toPx (number: any) {
    return isNaN(number) ? number : `${number}px`
}
