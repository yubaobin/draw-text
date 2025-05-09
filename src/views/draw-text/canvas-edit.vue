<template>
    <div class="canvas-wrapper bg-wrapper" ref="wrapperRef" :style="styles"></div>
</template>
<script lang="ts" setup>
import type { Ref } from 'vue'
import type { CanvasEventConfig } from '#/canvas'
import { getRefPromise } from '@/utils'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CanvasText from './canvas/canvas-text'
import CanvasStore from './canvas/store'
import { FILL_COLOR, formatBg } from './canvas/util'
defineEmits(['click'])
const wrapperRef: Ref<HTMLDivElement | null> = ref(null)

window.addEventListener('resize', resize)

let drawText: CanvasText

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    drawText.destroy()
    CanvasStore.action.reset()
})
onMounted(() => {
    getRefPromise(wrapperRef).then((ref) => {
        drawText = new CanvasText(ref, {
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
})

const styles = computed(() => {
    return formatBg(CanvasStore.getter.background || FILL_COLOR)
})

function resize () {
    if (wrapperRef.value) {
        const rect = wrapperRef.value.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        drawText.resizeCanvas({ width, height })
    }
}

defineExpose({
    clearCanvas () {
        drawText.clearCanvas()
        CanvasStore.action.setIsOpr(false)
        CanvasStore.action.setSavePath([])
    },
    getFile () {
        return drawText.toFile()
    },
    getImage () {
        return drawText.toImage()
    }
})
</script>
