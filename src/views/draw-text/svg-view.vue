<template>
    <div class="canvas-view" ref="canvasView"></div>
</template>
<script lang="ts" setup>
import type { IStartConfig } from '#/canvas'
import type { Ref } from 'vue'
import { getRefPromise } from '@/utils'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SvgText from './canvas/svg-text'

const canvasView: Ref<HTMLDivElement | null> = ref(null)

window.addEventListener('resize', resize)

let drawText: SvgText

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    drawText.destroy()
})
onMounted(() => {
    getRefPromise(canvasView).then((ref) => {
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
        drawText.start(config.points, config.text || 'yb', config.finish)
    },
    clearCanvas () {
        drawText.clearCanvas()
    }
})
</script>
