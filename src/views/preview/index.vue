<template>
    <div class="preview-container preview-page" ref="previewRef">
        <Share v-model:visible="visible" />
        <div class="preivew-body bg-wrapper" :style="styles">
            <svg-view v-if="isSvg" ref="svgViewRef"/>
            <canvas-view v-else ref="canvasViewRef"/>
        </div>
        <canvas id="fire-canvas"></canvas>
    </div>
</template>
<script lang="ts" setup>
import { textApi } from '@/api/text'
import { getRefPromise, parseUrl } from '@/utils'
import { computed, nextTick, onMounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import CanvasView from '../draw-text/canvas-view.vue'
import SvgView from '../draw-text/svg-view.vue'
import Share from './share.vue'
import { Firework } from '../draw-text/canvas/fire'
import { FILL_COLOR, formatBg } from '../draw-text/canvas/util'
const router = useRouter()
const previewRef: Ref<any> = ref(null)
const canvasViewRef: Ref<any> = ref(null)
const svgViewRef: Ref<any> = ref(null)
const params = parseUrl()

const isSvg = ref(false)
const visible = ref(false)

function animFinish () {
    visible.value = true
}

const background = ref(FILL_COLOR)

const styles = computed(() => {
    return formatBg(background.value || FILL_COLOR)
})

onMounted (() => {
    visible.value = false
    if (params.textid) {
        textApi.getTextById(params.textid).then((res) => {
            if (res.code === 0) {
                const result = res.result || {}
                const pointsStr = result.points
                const text = result.text
                background.value = result.background || FILL_COLOR
                isSvg.value = !!text
                const points = JSON.parse(pointsStr)
                if (points && points.length) {
                    nextTick(() => {
                        if (isSvg.value) {
                            svgViewRef.value.start({ text, points, finish: animFinish })
                        } else {
                            canvasViewRef.value.start({ text, points, finish: animFinish })
                        }
                        startFire()
                    })
                } else {
                    gotoError()
                }
                document.title = text || '新年快乐'
            } else {
                gotoError()
            }
        }).catch(() => {
            // gotoError()
        })
    } else {
        // gotoError()
    }
})

function rannum (min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min)
}

const timer: Ref<number> = ref(0)

function startFire () {
    getRefPromise(previewRef).then((ref) => {
        const { width, height } = ref.getBoundingClientRect()
        timer.value = window.setInterval(() => {
            var x = rannum(10, width - 10)
            var y = rannum(height / 3, height * 2 / 3)
            new Firework('.preview-page', 'fire-canvas').anim({ x, y })
        }, 600)
        window.setTimeout(function () {
            stopFire()
        }, 4000)
    })
}

function stopFire () {
    window.clearInterval(timer.value)
}

function gotoError () {
    router.replace({ name: 'error404' })
}
</script>
