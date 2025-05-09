;(function (win, lib) {
    const doc = win.document
    const docEl = doc.documentElement
    let metaEl = doc.querySelector('meta[name="viewport"]')
    const flexibleEl = doc.querySelector('meta[name="flexible"]')
    let dpr: number = 0
    let scale: number = 0
    let tid: any
    const flexible = lib.flexible || (lib.flexible = {})

    if (metaEl) {
        console.warn('将根据已有的meta标签来设置缩放比例')
        const match = (metaEl.getAttribute('content') || '').match(/initial\-scale=([\d\.]+)/)
        if (match) {
            scale = parseFloat(match[1])
            dpr = Math.floor(1 / scale)
        }
    } else if (flexibleEl) {
        const content = flexibleEl.getAttribute('content')
        if (content) {
            const initialDpr = content.match(/initial\-dpr=([\d\.]+)/)
            const maximumDpr = content.match(/maximum\-dpr=([\d\.]+)/)
            if (initialDpr) {
                dpr = parseFloat(initialDpr[1])
                scale = parseFloat((1 / dpr).toFixed(2))
            }
            if (maximumDpr) {
                dpr = parseFloat(maximumDpr[1])
                scale = parseFloat((1 / dpr).toFixed(2))
            }
        }
    }

    if (!dpr && !scale) {
        const isIPhone = win.navigator.userAgent.match(/iphone/gi)
        const devicePixelRatio = win.devicePixelRatio
        if (isIPhone) {
            // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
            if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                dpr = 3
            } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                dpr = 2
            } else {
                dpr = 1
            }
        } else {
            // 其他设备下，仍旧使用1倍的方案
            dpr = 1
        }
        scale = 1 / dpr
    }

    docEl.setAttribute('data-dpr', String(dpr))
    if (!metaEl) {
        metaEl = doc.createElement('meta')
        metaEl.setAttribute('name', 'viewport')
        metaEl.setAttribute(
            'content',
            'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no'
        )
        if (docEl.firstElementChild) {
            docEl.firstElementChild.appendChild(metaEl)
        } else {
            const wrap = doc.createElement('div')
            wrap.appendChild(metaEl)
            doc.write(wrap.innerHTML)
        }
    }

    function refreshRem() {
        let width = docEl.getBoundingClientRect().width
        if (width / dpr > 540) {
            width = 540 * dpr
        }
        const rem = width / 10
        docEl.style.fontSize = rem + 'px'
        flexible.rem = win.rem = rem
    }

    win.addEventListener(
        'resize',
        function () {
            clearTimeout(tid)
            tid = setTimeout(refreshRem, 300)
        },
        false
    )
    win.addEventListener(
        'pageshow',
        function (e: any) {
            if (e.persisted) {
                clearTimeout(tid)
                tid = setTimeout(refreshRem, 300)
            }
        },
        false
    )

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 * dpr + 'px'
    } else {
        doc.addEventListener(
            'DOMContentLoaded',
            function () {
                doc.body.style.fontSize = 12 * dpr + 'px'
            },
            false
        )
    }

    refreshRem()

    flexible.dpr = win.dpr = dpr
    flexible.refreshRem = refreshRem
    flexible.rem2px = function (d: any) {
        let val: any = parseFloat(d) * this.rem
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px'
        }
        return val
    }
    flexible.px2rem = function (d: any) {
        let val: any = parseFloat(d) / this.rem
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem'
        }
        return val
    }
})(window, window.lib || (window.lib = {}))
