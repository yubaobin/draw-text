<template>
    <div class="canvas-view" ref="canvasView"></div>
</template>
<script lang="ts" setup>
import { getRefPromise } from '@/utils'
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'
import SvgText from './canvas/svg-text'

interface IStartConfig {
    text?: string;
    points: Array<any>
}

const canvasView: Ref<HTMLDivElement | null> = ref(null)

window.addEventListener('resize', resize)

let drawText: SvgText

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    drawText.destroy()
})
onMounted(() => {
    getRefPromise(canvasView).then(ref => {
        drawText = new SvgText(ref)
    })
})

function resize () {
    if (canvasView.value) {
         const rect = canvasView.value.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        drawText.resizeCanvas({ width, height })
    }
}

defineExpose({
    start (config: IStartConfig) {
        resize()
        drawText.clearCanvas()
        drawText.start(config.points, config.text || 'yb')
    },
    clearCanvas () {
        drawText.clearCanvas()
    }
})
</script>
