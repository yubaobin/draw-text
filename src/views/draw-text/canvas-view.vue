<template>
    <div class="canvas-view" ref="canvasView"></div>
</template>
<script lang="ts" setup>
import { getRefPromise } from '@/utils'
import { IStartConfig } from 'types/canvas'
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'
import CanvasText from './canvas/canvas-text'


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
        drawText = new CanvasText(ref, { disabled: true })
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
        drawText.start(config.points, config.text || '', config.finish)
    },
    clearCanvas () {
        drawText.clearCanvas()
    }
})
</script>
