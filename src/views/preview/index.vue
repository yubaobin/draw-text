<template>
    <div class="preview-container preview-page" ref="previewRef">
        <div class="preview-header">
            <d-text @click="gotoEdit">我也要写一个</d-text>
            <div class="tips-right">
                <d-text @click="openShare">分享</d-text>
            </div>
        </div>
        <div class="preivew-body">
            <canvas-view ref="canvasViewRef"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { textApi } from '@/api/text'
import { parseUrl } from '@/utils'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import CanvasView from '../draw-text/canvas-view.vue'
import store from '@/store/index'
const router = useRouter()
const canvasViewRef: any = ref(null)
const params = parseUrl()

onMounted (() => {
    if (params.textid) {
        textApi.getTextById(params.textid).then((res) => {
            if (res.code === 0) {
                const result = res.result || {}
                const pointsStr = result.points
                const text = result.text
                const points = JSON.parse(pointsStr)
                if (points && points.length) {
                    canvasViewRef.value.start({ text, points })
                } else {
                    gotoError()
                }
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
    router.push({ name: 'DrawText' })
}

function openShare () {
    store.action.setShare(true)
}
</script>
