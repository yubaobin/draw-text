<template>
    <div class="canvas-wrapper" ref="wrapperRef"></div>
</template>
<script lang="ts" setup>
import { CanvasEventConfig } from 'types/canvas'
import { onBeforeUnmount, onMounted, ref, Ref } from 'vue'
import CanvasText from './canvas/canvas-text'
import CanvasStore from './canvas/store'
defineEmits(['click'])
const wrapperRef: Ref<HTMLDivElement | null> = ref(null)

window.addEventListener('resize', resize)

let drawText: CanvasText

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    drawText.destroy()
})
onMounted(() => {
    drawText = new CanvasText(wrapperRef.value, {
        on: {
            start: (config: CanvasEventConfig) => {
                CanvasStore.action.setIsOpr(config.isOpr)
            },
            end: (config: CanvasEventConfig) => {
                CanvasStore.action.setIsOpr(config.isOpr)
                CanvasStore.action.setSavePath(config.savePath)
            }
        }
    })
})

function resize () {
    if (wrapperRef.value) {
        const { width, height } = wrapperRef.value.getBoundingClientRect()
        drawText.resizeCanvas({ width, height })
    }
}

defineExpose({
    clearCanvas () {
        drawText.clearCanvas()
        CanvasStore.action.setIsOpr(false)
        CanvasStore.action.setSavePath([])
    }
})
</script>
