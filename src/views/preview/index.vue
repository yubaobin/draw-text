<template>
    <div class="preview-container preview-page" ref="previewRef">
        <div class="preview-header">
            <d-text @click="gotoEdit">我也要写一个</d-text>
            <div class="tips-right">
                <d-text @click="openShare">分享</d-text>
            </div>
        </div>
        <div class="preivew-body bg-wrapper" :style="styles">
            <svg-view v-if="isSvg" ref="svgViewRef"/>
            <canvas-view v-else ref="canvasViewRef"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { textApi } from '@/api/text'
import { parseUrl } from '@/utils'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CanvasView from '../draw-text/canvas-view.vue'
import SvgView from '../draw-text/svg-view.vue'
import store from '@/store/index'
import { showAllNonBaseMenuItem } from '@/hook/auth'
import { FILL_COLOR, formatBg } from '../draw-text/canvas/util'
const router = useRouter()
const canvasViewRef: any = ref(null)
const svgViewRef: any = ref(null)
const params = parseUrl()

const isSvg = ref(false)

const background = ref(FILL_COLOR)

const styles = computed(() => {
    return formatBg(background.value || FILL_COLOR)
})

showAllNonBaseMenuItem()

onMounted (() => {
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
                            svgViewRef.value.start({ text, points })
                        } else {
                            canvasViewRef.value.start({ text, points })
                        }
                    })
                } else {
                    gotoError()
                }
                document.title = text || '新年快乐'
            } else {
                gotoError()
            }
        }).catch(() => {
            gotoError()
        })
    } else {
        gotoError()
    }
})

function gotoError () {
    router.replace({ name: 'error404' })
}

function gotoEdit () {
    router.replace({ name: 'DrawText' })
}

function openShare () {
    store.action.setShare(true)
}
</script>
