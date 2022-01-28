<template>
    <div class="content-wrapper">
        <div class="draw-container">
            <div class="top-container">
                <header-panel @click="handleClick" />
            </div>
            <div class="view-container">
                <div class="edit-tips" v-if="showEditTips">写个字试下先</div>
                <canvas-edit ref="canvasEditRef" />
            </div>
            <div class="botton-container">
                <tool-panel/>
            </div>
        </div>
        <preview-model ref="previewRef"/>
        <publish-model ref="publishModelRef"/>
    </div>
</template>
<script lang="ts" setup>
import HeaderPanel from './header-panel.vue'
import CanvasEdit from './canvas-edit.vue'
import ToolPanel from './tool-panel.vue'
import PreviewModel from './preview-model.vue'
import PublishModel from './publish-model.vue'
import { computed, Ref, ref, unref } from 'vue'
import CanvasStore from './canvas/store'
import { Toast } from 'vant'
import { showAllNonBaseMenuItem } from '@/hook/auth'
import store from '@/store/index'

const previewRef: Ref<any> = ref(null)
const publishModelRef: Ref<any> = ref(null)
const canvasEditRef: Ref<any> = ref(null)

showAllNonBaseMenuItem()

function handleClick (type: string) {
    if (type === 'preview') {
        if (CanvasStore.getter.savePath.length) {
            if (previewRef.value && canvasEditRef.value) {
                previewRef.value.open(canvasEditRef.value.getFile())
            }
        } else {
            Toast({ message: '写个字试下先' })
        }
    } else if (type === 'clear') {
        const ref: any = unref(canvasEditRef)
        if (ref) {
            ref.clearCanvas()
        }
    } else if (type === 'public') {
        if (CanvasStore.getter.savePath.length) {
            if (canvasEditRef.value) {
                publishModelRef.value.open(canvasEditRef.value.getFile())
            }
        } else {
            Toast({ message: '写个字试下先' })
        }
    } else if (type === 'share') {
        store.action.setShare(true)
    }
}

const showEditTips = computed(() => {
    return !CanvasStore.getter.savePath.length && !CanvasStore.getter.isOpr
})
</script>
<style lang="less" scoped>
.preview {
    position: fixed;
    width: 100px;
    right: 0;
    top: 0;
    z-index: 99;
}
</style>
