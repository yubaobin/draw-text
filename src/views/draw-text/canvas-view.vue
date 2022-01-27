<template>
    <div class="canvas-view" ref="canvasView"></div>
</template>
<script lang="ts" setup>
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
    drawText = new CanvasText(canvasView.value)
})

function resize () {
    if (canvasView.value) {
        const { width, height } = canvasView.value.getBoundingClientRect()
        drawText.resizeCanvas({ width, height })
    }
}

defineExpose({
    start (config: IStartConfig) {
        console.log(config)
        resize()
        drawText.clearCanvas()
        drawText.start(config.points, config.text)
    },
    clearCanvas () {
        drawText.clearCanvas()
    }
})
</script>
