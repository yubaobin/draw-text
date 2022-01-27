import { CanvasConfig, CanvasSize, EventList, IPoint } from 'types/canvas'
import { addEvent, calcDistance, calcLineWidth, CANVAS_ID, removeEvent, windowToCanvas } from './util'
const ua = navigator.userAgent.toLowerCase()
export const isMobile = /mobile|phone|android|pad/.test(ua)

enum enumEvent {
    click = 'click',
    start = 'start',
    move = 'move',
    end = 'end',
}

const EVENT_LIST: Array<string> = [enumEvent.click, enumEvent.start, enumEvent.move, enumEvent.end]
class CanvasText {
    parentWrapper: Element | null = null
    canvas: HTMLCanvasElement | null = null
    context: CanvasRenderingContext2D | null = null

    canvasWidth: number = 0
    canvasHeight: number = 0

    isMouseDown: boolean = false
    lastLoc: IPoint = { x: 0, y: 0 }
    lastLineWidth: number = -1
    lastTimestamp: number = 0

    eventBus: any = {}
    savePath: Array<Array<IPoint>> = []
    strokeColor: string = '#000'
    isOpr: boolean = false

    // 动画
    animTimer: any = null
    animRun: boolean = false

    // 保存
    recordPath: Array<IPoint> = []

    constructor (wrapper: HTMLElement | Element | null, config?: CanvasConfig) {
        if (config) {
            this.canvasWidth = config.width || 0
            this.canvasHeight = config.height || 0
            this._initEvent(config)
        }
        this._initCanvas(wrapper)
    }

    private _initCanvas (wrapper: HTMLElement | Element | null) {
        if (wrapper) {
            if (wrapper instanceof HTMLCanvasElement) {
                this.parentWrapper = null
                this._useCanvas(wrapper)
            } else {
                this.parentWrapper = wrapper
                this._createdCanvas()
            }
            this._removeEventListener()
            this.clearCanvas()
            this._addEventListener()
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
            this.canvas = document.createElement('canvas')
            this.canvas.id = CANVAS_ID + '_' + Date.now()
            if (this.parentWrapper) {
                const rect = this.parentWrapper.getBoundingClientRect()
                width = rect.width
                height = rect.height
                this.parentWrapper.appendChild(this.canvas)
            } else {
                width = document.body.clientWidth
                height = document.body.clientHeight
                document.body.appendChild(this.canvas)
            }
            this.canvasWidth = width
            this.canvasHeight = height
        }
        this._resizeCanvas()
    }

    /**
     * 使用传入原来canvas
     */
    private _useCanvas (wrapper: HTMLCanvasElement) {
        if (wrapper) {
            this.canvas = wrapper
            this.canvasWidth = wrapper.width
            this.canvasHeight = wrapper.height
        }
    }

    private _resizeCanvas () {
        if (this.canvas) {
            this.canvas.width = this.canvasWidth
            this.canvas.height = this.canvasHeight
            this.context = this.canvas.getContext('2d')
        }
    }

    private _addEventListener () {
        if (this.canvas) {
            addEvent(this.canvas, isMobile ? 'touchstart' : 'mousedown', this._touchstart.bind(this))
            addEvent(this.canvas, isMobile ? 'touchmove' : 'mousemove', this._touchmove.bind(this))
            addEvent(this.canvas, isMobile ? 'touchend' : 'mouseup', this._touchend.bind(this))
            addEvent(this.canvas, 'click', this._click.bind(this))
        }
    }

    private _removeEventListener () {
        if (this.canvas) {
            removeEvent(this.canvas, isMobile ? 'touchstart' : 'mousedown', this._touchstart.bind(this))
            removeEvent(this.canvas, isMobile ? 'touchmove' : 'mousemove', this._touchmove.bind(this))
            removeEvent(this.canvas, isMobile ? 'touchend' : 'mouseup', this._touchend.bind(this))
            removeEvent(this.canvas, 'click', this._click.bind(this))
        }
    }

    /**
     * 开始写
     * @param point 
     */
    private _beginStroke (point: IPoint) {
        this.isMouseDown = true
        // 第一次用户画的坐标初始值  
        this.lastLoc = windowToCanvas(this.canvas, point.x, point.y)
        // 获取首次点击鼠标 事件戳  
        this.lastTimestamp = new Date().getTime()
        this.recordPath = []
    }

    /**
     * 写的过程
     * @param point 
     * @returns 
     */
    private _moveStroke (point: IPoint) {
        if (!this.context) return
        // 开始绘制直线  
        let curLoc = windowToCanvas(this.canvas, point.x, point.y)
        // 路程  
        let s = calcDistance(curLoc, this.lastLoc)
        // 结束时间  
        let curTimestamp = new Date().getTime()
        // 时间差  
        let t = curTimestamp - this.lastTimestamp
        // 绘制线条粗细  
        let lineWidth = calcLineWidth(t, s, this.lastLineWidth)

        // 绘制  
        this.context.beginPath()
        this.context.moveTo(this.lastLoc.x, this.lastLoc.y)
        this.context.lineTo(curLoc.x, curLoc.y)
        this.context.strokeStyle = this.strokeColor
        this.context.lineWidth = lineWidth
        this.context.lineCap = 'round'
        this.context.lineJoin = 'round'
        this.context.stroke()
        // 给lastLoc赋值维护  
        this.lastLoc = curLoc
        // 时间更新  
        this.lastTimestamp = curTimestamp
        this.lastLineWidth = lineWidth
        this.recordPath.push(curLoc)
    }

    /**
     * 结束
     */
    private _endStroke () {
        this.isMouseDown = false
        if (this.recordPath.length) {
            this.savePath.push(this.recordPath)
            this.recordPath = []
        }
        if (!this.savePath.length) {
            this.isOpr = false
        }
    }

    private _touchstart (e: MouseEvent | TouchEvent) {
        e.preventDefault()
        this.isOpr = true
        let point: IPoint = { x: 0, y: 0 }
        if (e instanceof TouchEvent) {
            const touch = e.touches[0] // 获取第一个触点
            point.x = touch.pageX
            point.y = touch.pageY
        } else if (e instanceof MouseEvent) {
            point.x = e.clientX
            point.y = e.clientY
        }
        this._beginStroke(point)
        this._emitEvent(enumEvent.start, {
            event: e,
            savePath: this.savePath,
            recordPath: this.recordPath,
            isOpr: this.isOpr
        })
        if (isMobile) {
            this._emitEvent(enumEvent.click, {
                event: e,
                savePath: this.savePath,
                recordPath: this.recordPath,
                isOpr: this.isOpr
            })
        }
    }
    private _touchmove (e: MouseEvent | TouchEvent) {
        e.preventDefault()
        if (this.isMouseDown) {
            let point: IPoint = { x: 0, y: 0 }
            if (e instanceof TouchEvent) {
                const touch = e.touches[0] // 获取第一个触点
                point.x = touch.pageX
                point.y = touch.pageY
            } else if (e instanceof MouseEvent) {
                point.x = e.clientX
                point.y = e.clientY
            }
            this._moveStroke(point)
            this._emitEvent(enumEvent.move, {
                event: e,
                savePath: this.savePath,
                recordPath: this.recordPath,
                isOpr: this.isOpr
            })
        }
    }
    private _touchend (e: Event) {
        e.preventDefault()
        this._endStroke()
        this._emitEvent(enumEvent.end, {
            event: e,
            savePath: this.savePath,
            recordPath: this.recordPath,
            isOpr: this.isOpr
        })
    }
    private _click (e: Event) {
        this._emitEvent(enumEvent.click, e)
    }
    private _initEvent (config?: CanvasConfig) {
        if (config && config.on) {
            Object.keys(config.on).forEach((key: any) => {
                if (EVENT_LIST.includes(key) && config.on) {
                    this.eventBus[key] = config.on[key]
                }
            })
        }
    }
    private _emitEvent (event: EventList, ...arg: Array<any>) {
        if (this.eventBus[event]) {
            this.eventBus[event].apply(this, arg)
        }
    }

    private convertBase64UrlToBlob (urlData: string): Blob {
        const data = urlData.split(',')
        let bytes = window.atob(data[1])
        let ab = new ArrayBuffer(bytes.length)
        let ia = new Uint8Array(ab)
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], { type: 'image/jpg' })
    }

    /**
     * 重置画布大小
     * @param config CanvasSize
     */
    resizeCanvas (config?: CanvasSize) {
        const { width, height } = config || {}
        this.canvasWidth = width || document.body.clientWidth
        this.canvasHeight = height || document.body.clientHeight
        this._resizeCanvas()
    }

    /**
     * 情况画布
     */
    clearCanvas () {
        if (this.context) {
            this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
            this.savePath = []
            this.recordPath = []
            this.isOpr = false
        }
    }
    /**
     * 销毁
     */
    destroy () {
        this.clearCanvas()
        if (this.canvas) {
            this._removeEventListener()
            if (this.parentWrapper) {
                this.parentWrapper.removeChild(this.canvas)
                this.parentWrapper = null
            }
            this.canvas = null
            this.context = null
        }
    }

    draw (point: IPoint) {
        if (!this.context) return
        // 开始绘制直线  
        let curLoc = windowToCanvas(this.canvas, point.x, point.y)
        // 路程  
        let s = calcDistance(curLoc, this.lastLoc)
        // 结束时间  
        let curTimestamp = new Date().getTime()
        // 时间差  
        let t = curTimestamp - this.lastTimestamp
        // 绘制线条粗细  
        let lineWidth = calcLineWidth(t, s, this.lastLineWidth)

        // 绘制  
        this.context.beginPath()
        this.context.moveTo(this.lastLoc.x, this.lastLoc.y)
        this.context.lineTo(curLoc.x, curLoc.y)
        this.context.strokeStyle = this.strokeColor
        this.context.lineWidth = lineWidth
        this.context.lineCap = 'round'
        this.context.lineJoin = 'round'
        this.context.stroke()
        // 给lastLoc赋值维护  
        this.lastLoc = curLoc
        // 时间更新  
        this.lastTimestamp = curTimestamp
        this.lastLineWidth = lineWidth
        this.recordPath.push(curLoc)
    }

    drawWithText (point: IPoint) {
        if (!this.context) return
        // 开始绘制直线  
        let curLoc = windowToCanvas(this.canvas, point.x, point.y)
        // 路程  
        let s = calcDistance(curLoc, this.lastLoc)
        this.lastLoc = curLoc
        if (s > 5) {
            this.context.fillText('完', curLoc.x, curLoc.y)
        }
    }

    start (points: Array<Array<IPoint>>, text?: string) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const me = this
        let row: number = 0
        let col: number = 0
        let rowLen: number = points.length
        let colLen: number = rowLen ? points[row].length : 0
        this.animRun = true
        const drawFun = text ? this.drawWithText.bind(this) : this.draw.bind(this)
        function anim () {
            const curPoint = points[row][col]
            drawFun(curPoint)
            col++
            if (col > colLen - 1) { // 下一个笔划
                row++
                me._closePath()
                if (row > rowLen - 1) { // 画完，结束
                    me.stop()
                } else {
                    colLen = points[row].length
                    col = 0
                    me.lastLoc = points[row][col]
                }
            }
            if (me.animRun) {
                me.animTimer = window.requestAnimationFrame(anim)
            }
        }
        if (rowLen > 0 && colLen > 0) {
            this.lastLoc = points[row][col]
            anim()
        }
    }

    toImage (): string {
        if (this.canvas) {
            return this.canvas.toDataURL('image/png')
        } else {
            return ''
        }
    }

    toFile () {
        if (this.canvas) {
            const urlData: string = this.toImage()
            const blob: Blob = this.convertBase64UrlToBlob(urlData)
            const file = new File([blob], `${new Date().getTime()}.png` )
            return file
        }
    }

    

    stop () {
        this.animRun = false
        window.cancelAnimationFrame(this.animTimer)
    }

    private _closePath () {
        if (this.context) {
            this.context.closePath()
        }
    }
}

export default CanvasText
