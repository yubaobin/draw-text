import type { IPoint } from '#/canvas'

export const CANVAS_ID = 'draw-wrapper-id'
export const maxV = 10
export const minV = 0.1
export const maxLineWidth = 10
export const minLineWidth = 1
export const FILL_COLOR = '#FF4646'
export const STROKE_COLOR = '#F0d294'
export const FONTSIZE = 20
// 检测是否支持passive选项
let supportsPassiveOption = false
try {
    const opts: any = Object.defineProperty({}, 'passive', {
        get: function () {
            supportsPassiveOption = true
        }
    })
    window.addEventListener('test', function () {}, opts)
} catch (e) {
    console.log(e)
}

/**
 * 限制范围
 */
function limitRange (num: number, max: number, min: number) {
    if (num < min) {
        return min
    } else if (num > max) {
        return max
    }
    return num
}

export function addEvent (el: Element, type: string, method: (...arg: Array<any>) => void) {
    el.addEventListener(type, method, supportsPassiveOption ? ({ passive: false } as EventListenerOptions) : false)
}

export function removeEvent (el: Element, type: string, method: (...arg: Array<any>) => void) {
    el.removeEventListener(type, method, supportsPassiveOption ? ({ passive: false } as EventListenerOptions) : false)
}

/**
 * 获取canvas 坐标 x，y 分别代表相对window内的xy
 * @param canvas
 * @param x
 * @param y
 * @returns
 */
export function windowToCanvas (canvas: HTMLCanvasElement | null, x: number, y: number): IPoint {
    if (canvas) {
        const { left, top, height, width } = canvas.getBoundingClientRect()
        const rx = Math.round(x - left)
        const ry = Math.round(y - top)
        return {
            x: limitRange(rx, width, 0),
            y: limitRange(ry, height, 0)
        }
    } else {
        return {
            x,
            y
        }
    }
}

/**
 *  用来计算书写速度来改变线条粗细
 * @param loc1 速度 = 路程 / 时间
 * @param loc2
 * @returns
 */
export function calcDistance (loc1: IPoint, loc2: IPoint): number {
    //返回 数的平方根
    return Math.sqrt((loc1.x - loc2.x) * (loc1.x - loc2.x) + (loc1.y - loc2.y) * (loc1.y - loc2.y))
}

/**
 * 线条宽度
 * @param t
 * @param s
 * @returns
 */
export function calcLineWidth (t: number, s: number, lastLineWidth: number) {
    const v = s / t
    let resultLineWidth: number
    if (v <= minV) {
        resultLineWidth = maxLineWidth
    } else if (v >= maxV) {
        resultLineWidth = minLineWidth
    } else {
        resultLineWidth = maxLineWidth - ((v - minV) / (maxV - minV)) * (maxLineWidth - minLineWidth)
    }
    if (lastLineWidth == -1) {
        return resultLineWidth
    } else {
        return (lastLineWidth * 2) / 3 + (resultLineWidth * 1) / 3
    }
}

/**
 * 格式化背景
 * @param bg
 * @returns
 */
export function formatBg (bg: string): any {
    const span = document.createElement('span')
    span.style.color = bg
    if (span.style.color) {
        return {
            'background-color': bg
        }
    } else {
        return {
            'background-image': `url(${bg}?token=123)`
        }
    }
}
