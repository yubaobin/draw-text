interface IFireBox extends HTMLElement {
    timer: number
}
interface IPosition {
    top: number
}
export class Firework {
    parentWrapper: any
    particles: any = []
    rid: any = null
    canvas: any = null
    count: any = 0
    ch: any
    context: any = null
    firebox: any = null
    constructor (el: string, canvasId: string) {
        this.parentWrapper = document.querySelector(el)
        this.canvas = document.getElementById(canvasId)
        if (this.canvas) {
            this.context = this.canvas.getContext('2d')
        }
        this.resizeCanvas()
    }
    anim (config: any = {}) {
        const { x } = config
        this.clearCanvas()
        // 1.创建烟花节点。
        this.firebox = document.createElement('div')
        this.firebox.class = '.fire-item'
        this.firebox.style.cssText = `width:5px;height:8px;background:#fff;border-radius: 50%;position:absolute;left:${x}px;top:${this.ch}px;`
        if (this.parentWrapper) {
            this.parentWrapper.appendChild(this.firebox)
        }
        this.firemove(config) //创建完成，直接运动。
    }
    resizeCanvas () {
        const rect = this.parentWrapper.getBoundingClientRect()
        this.canvas.width = rect.width
        this.canvas.height = rect.height
        this.ch = rect.height //可视区的高度
    }
    //2.烟花节点运动
    firemove (config: any = {}) {
        const { x, y } = config
        this.bufferMove(this.firebox, { top: y }, () => {
            if (this.parentWrapper) {
                this.parentWrapper.removeChild(this.firebox)
            }
            // 当烟花节点消失的时候，创建烟花碎片
            this.fire(x, y)
        })
    }
    bufferMove (obj: IFireBox, json: IPosition, fn: () => void) {
        let speed = 0
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let me = this
        clearInterval(obj.timer)
        obj.timer = window.setInterval(function () {
            let flag = true
            for (let attr in json) {
                let currentValue = 0
                if (attr === 'opacity') {
                    currentValue = Math.round(me.getStyle(obj, attr) * 100)
                } else {
                    currentValue = parseInt(me.getStyle(obj, attr))
                }
                speed = (json[attr] - currentValue) / 10
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)

                if (currentValue !== json[attr]) {
                    if (attr === 'opacity') {
                        obj.style.opacity = (currentValue + speed) / 100 + ''
                        obj.style.filter =
                            'alpha(opacity=' + (currentValue + speed) + ')' //IE
                    } else {
                        obj.style[attr] = currentValue + speed + 'px'
                    }
                    flag = false
                }
            }
            if (flag) {
                clearInterval(obj.timer)
                fn && typeof fn === 'function' && fn()
            }
        }, 10)
    }
    getStyle (element: HTMLElement, property: string) {
        let getComputedStyle = window.getComputedStyle
        if (getComputedStyle) {
            return getComputedStyle(element).getPropertyValue(property)
        } else {
            return element.style[property]
        }
    }
    clearCanvas () {
        // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    fire (x: number, y: number) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let me = this
        me.createFireworks(x, y)

        function tick () {
            console.log('anim')
            me.context.globalCompositeOperation = 'destination-out'
            me.context.fillStyle = 'rgba(0,0,0,' + 10 / 100 + ')'
            me.context.fillRect(0, 0, me.canvas.width, me.canvas.height)
            me.context.globalCompositeOperation = 'lighter'
            let result = me.drawFireworks()
            if (result) {
                me.rid = requestAnimationFrame(tick)
            }
        }
        cancelAnimationFrame(me.rid)
        tick()
    }

    stop () {
        cancelAnimationFrame(this.rid)
        this.clearCanvas()
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    createFireworks (sx: number, sy: number) {
        this.particles = []
        this.count = 0
        let hue = Math.floor(Math.random() * 11) + 20
        let hueVariance = 30
        let count = 100
        for (let i = 0; i < count; i++) {
            let p: any = {}
            let angle = Math.floor(Math.random() * 360)
            p.radians = (angle * Math.PI) / 180
            p.x = sx
            p.y = sy
            p.speed = Math.random() * 5 + 0.4
            p.radius = p.speed
            p.size = Math.floor(Math.random() * 3) + 1
            p.hue =
                Math.floor(
                    Math.random() * (hue + hueVariance - (hue - hueVariance))
                ) +
                (hue - hueVariance)
            p.brightness = Math.floor(Math.random() * 31) + 50
            p.alpha = (Math.floor(Math.random() * 61) + 40) / 100
            this.particles.push(p)
        }
    }

    canStop () {
        if (this.count > this.particles.length - 10) {
            return true
        } else {
            return false
        }
    }

    drawFireworks () {
        this.clearCanvas()
        if (this.canStop()) {
            this.stop()
            return false
        } else {
            this.count = 0
            for (let i = 0; i < this.particles.length; i++) {
                let p = this.particles[i]
                let vx = Math.cos(p.radians) * p.radius
                let vy = Math.sin(p.radians) * p.radius + 0.4
                p.x += vx
                p.y += vy
                p.radius *= 1 - p.speed / 100
                p.alpha -= 0.005
                if (p.alpha < 0) {
                    this.count++
                }
                this.context.beginPath()
                this.context.arc(p.x, p.y, p.size, 0, Math.PI * 2, false)
                this.context.closePath()
                this.context.fillStyle =
                    'hsla(' +
                    p.hue +
                    ', 100%, ' +
                    p.brightness +
                    '%, ' +
                    p.alpha +
                    ')'
                this.context.fill()
            }
            return true
        }
    }
    // 随机区间数
    rannum (min: number, max: number) {
        return Math.round(Math.random() * (max - min) + min)
    }
}
