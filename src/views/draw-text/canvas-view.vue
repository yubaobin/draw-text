<template>
    <div class="canvas-view" ref="canvasView"></div>
</template>
<script lang="ts" setup>
import { getRefPromise } from '@/utils'
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'
import CanvasText from './canvas/canvas-text'

interface IStartConfig {
    text?: string;
    points: Array<any>
}

defineEmits(['click'])
const canvasView: Ref<HTMLDivElement | null> = ref(null)

window.addEventListener('resize', resize)

let drawText: CanvasText

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    drawText.destroy()
})
onMounted(() => {
    getRefPromise(canvasView).then(ref => {
        drawText = new CanvasText(ref)
    })
})

function resize () {
    if (canvasView.value) {
         const rect = canvasView.value.getBoundingClientRect()
        const width = rect.width || canvasView.value.clientWidth
        const height = rect.height || canvasView.value.clientHeight
        drawText.resizeCanvas({ width, height })
    }
}

defineExpose({
    start (config: IStartConfig) {
        resize()
        drawText.clearCanvas()
        drawText.start(config.points, config.text)
    },
    clearCanvas () {
        drawText.clearCanvas()
    }
})
</script>
