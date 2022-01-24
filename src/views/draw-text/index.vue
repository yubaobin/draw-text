<template>
    <div class="content-wrapper">
        <div class="draw-container">
            <div class="top-container">
                <header-panel @click="handleClick" />
            </div>
            <div class="view-container">
                <div class="edit-tips" v-if="showEditTips">画个半圆向下挥</div>
                <canvas-edit ref="canvasEditRef" />
            </div>
            <div class="botton-container">
                <tool-panel/>
            </div>
        </div>
        <preview-model ref="previewRef"/>
    </div>
</template>
<script lang="ts" setup>
import HeaderPanel from './header-panel.vue'
import CanvasEdit from './canvas-edit.vue'
import ToolPanel from './tool-panel.vue'
import PreviewModel from './preview-model.vue'
import { computed, ref, unref } from 'vue'
import CanvasStore from './canvas/store'
import { Toast } from 'vant'

const previewRef = ref(null)
const canvasEditRef = ref(null)

function handleClick (type: string) {
    if (type === 'preview') {
        if (CanvasStore.getter.savePath.length) {
            const ref: any = unref(previewRef)
            if (ref) {
                ref.open()   
            }
        } else {
            Toast({
                message: '画个半圆向下挥'
            })
        }
    } else if (type === 'clear') {
        const ref: any = unref(canvasEditRef)
        if (ref) {
            ref.clearCanvas()
        }
    }
}

const showEditTips = computed(() => {
    return !CanvasStore.getter.savePath.length && !CanvasStore.getter.isOpr
})
</script>
