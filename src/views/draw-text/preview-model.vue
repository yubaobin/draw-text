<template>
    <transition name="slide-in" @after-enter="handleEnter" @after-leave="handleLeave">
        <div class="preview-container" ref="previewRef" v-show="visible">
            <div class="preivew-body">
                <canvas-view ref="canvasViewRef"/>
            </div>
            <div class="preivew-footer">
                <div class="btn-close" @click="close">
                    <svg-icon icon-name="close"/>
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, ref, Ref, watch } from 'vue'
import CanvasView from './canvas-view.vue'

function stop (e: any) {
    e.stopPropagation()
}

export default defineComponent({
    components: {
        CanvasView
    },
    setup () {
        const previewRef: Ref<HTMLDivElement | null> = ref(null)
        const visible = ref(false)

        function createDialog () {
            nextTick(() => {
                if (previewRef.value) {
                    document.body.appendChild(previewRef.value)
                    previewRef.value.addEventListener('click', stop)
                }
            })
        }
        onBeforeUnmount(() => {
            if (previewRef.value && previewRef.value.parentNode === document.body) {
                previewRef.value.removeEventListener('click', stop)
                document.body.removeChild(previewRef.value)
                previewRef.value = null
            }
        })
        watch(visible, (newVal: boolean) => {
            if (newVal) {
                createDialog()
            }
        })

        return {
            previewRef,
            visible
        }
    },
    methods: {
        createDialog () {
            this.$nextTick(() => {
                if (this.previewRef) {
                    document.body.appendChild(this.previewRef)
                    this.previewRef.addEventListener('click', stop)
                }
            })
        },
        handleEnter () {
            this.$nextTick(() => {
                const viewRef: any = this.$refs.canvasViewRef
                viewRef.start()
            })
        },
        handleLeave () {
            const viewRef: any = this.$refs.canvasViewRef
            viewRef.clearCanvas()
        },
        open () {
            this.visible = true

        },
        close () {
            this.visible = false
        }
    }
})
</script>
