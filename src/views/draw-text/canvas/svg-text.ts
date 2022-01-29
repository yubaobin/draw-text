import { IPoint } from 'types/canvas'
import { SvgConfig } from 'types/svg'
import { CANVAS_ID, FONTSIZE, STROKE_COLOR } from './util'

class SvgText {
    parentWrapper: Element | null = null
    canvas: any

    strokeColor: string = STROKE_COLOR

    fontSize: number = FONTSIZE
    space: number = FONTSIZE + 6

    
    svgWidth: number = 0
    svgHeight: number = 0

    // 动画
    animTimer: any = null
    animRun: boolean = false

    constructor (wrapper: HTMLElement | string | null, config?: SvgConfig) {
        if (config) {
            this.svgWidth = config.width || 0
            this.svgHeight = config.height || 0
        }
        this._initCanvas(wrapper)
    }

    private _initCanvas (wrapper: HTMLElement | string | null) {
        if (wrapper) {
            if (typeof wrapper === 'string') {
                this.parentWrapper = null
                this.canvas = window.Snap('#svg')
                this._useCanvas(this.canvas)
            } else {
                this.parentWrapper = wrapper
                this._createdCanvas()
            }
            this.clearCanvas()
        } else {
            console.warn('canvas is null')
        }
    }
    /**
     * 创建canvas
     * @param config 
     */
     private _createdCanvas () {
        if (!this.canvas) {
            let width = 0
            let height = 0
            if (this.parentWrapper) {
                const rect = this.parentWrapper.getBoundingClientRect()
                width = rect.width
                height = rect.height
                this.canvas = window.Snap(width, height)
                this.parentWrapper.appendChild(this.canvas.node)
            } else {
                width = document.body.clientWidth
                height = document.body.clientHeight
                this.canvas = window.Snap(width, height)
                document.body.appendChild(this.canvas.node)
            }
            this.canvas.attr('id', CANVAS_ID + '_' + Date.now())
            this.svgWidth = width
            this.svgHeight = height
        }
        this._resizeCanvas()
    }

    /**
     * 使用传入原来canvas
     */
    private _useCanvas (wrapper: any) {
        if (wrapper) {
            this.svgWidth = wrapper.attr('width')
            this.svgHeight = wrapper.attr('height')
        }
    }

    private _resizeCanvas () {
        if (this.canvas) {
            this.canvas.attr('width', this.svgWidth)
            this.canvas.attr('height', this.svgHeight)
        }
    }

    private _changePath (points: Array<IPoint>) {
        let pathStr = ''
        const length = points.length
        points.forEach((point: IPoint, index: number) => {
            pathStr += `${point.x} ${point.y}`
            if (index < length - 1) {
                pathStr += ' '
            }
        })
        return 'M' + pathStr
    }

    private _initPath (points: Array<Array<IPoint>>) {
        let allPath: Array<any> = []
        if (this.canvas) {
            if (points.length) {
                points.forEach((pointList: Array<IPoint>) => {
                    const path = this.canvas.paper.path(this._changePath(pointList))
                    path.attr({
                        fill: 'none',
                        stroke: 'none'
                    })
                    allPath.push(path)
                })
            }
        }
        return allPath
    }

    private _await (time: number): Promise<any> {
        return new Promise((resolve: any) => {
            window.setTimeout(() => {
                resolve()
            }, time)
        })
    }

    /**
     * 重置画布大小
     * @param config CanvasSize
     */
    resizeCanvas (config?: SvgConfig) {
        const { width, height } = config || {}
        this.svgWidth = width || document.body.clientWidth
        this.svgHeight = height || document.body.clientHeight
        this._resizeCanvas()
    }

    start (points: Array<Array<IPoint>>, text: string) {
        const drawText = text || 'yb'
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const me = this
        const allPath: Array<any> = this._initPath(points)
        const curIndex: number = 0
        const length = allPath.length
        let curPath: any
        let curPathIndex: number = 0
        let distance: number = 0
        let curRoute: number = 0
        this.animRun = true
        async function anim () {
            const pos: any = curPath.getPointAtLength(curRoute)
            const paperText = me.canvas.paper.text(pos.x, pos.y, drawText)
            paperText.attr({
                fill: me.strokeColor,
                stroke: me.strokeColor,
                'font-size': me.fontSize
            })
            curRoute += me.space
            if (curRoute > distance) { // 下一个笔划
                curPathIndex++
                curRoute = 0
                if (curPathIndex > length - 1) { //画完，结束
                    me.stop()
                } else {
                    curPath = allPath[curPathIndex]
                    if (curPath) {
                        distance = curPath.getTotalLength()
                    }
                }
            }
            if (me.animRun) {
                await me._await(60)
                me.animTimer = window.requestAnimationFrame(anim)
            }
        }
        if (curIndex < length) {
            curPath = allPath[curPathIndex]
            if (curPath) {
                distance = curPath.getTotalLength()
            }
            anim()
        }
    }

    /**
     * 情况画布
     */
    clearCanvas () {
        if (this.canvas) {
            this.canvas.clear()
        }
    }
    /**
     * 销毁
     */
    destroy () {
        this.clearCanvas()
        if (this.canvas) {
            this.stop()
            if (this.parentWrapper) {
                this.parentWrapper.removeChild(this.canvas.node)
                this.parentWrapper = null
            }
            this.canvas = null
        }
    }

    stop () {
        this.animRun = false
        window.cancelAnimationFrame(this.animTimer)
    }
}

export default SvgText