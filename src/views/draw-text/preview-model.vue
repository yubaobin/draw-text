<template>
    <transition name="slide-in" @after-enter="handleEnter" @after-leave="handleLeave">
        <div class="preview-container" ref="previewRef" v-show="visible">
            <div class="preview-header">
                {{ tipsMessage }}
            </div>
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
import { computed, defineComponent, nextTick, onBeforeUnmount, ref, Ref, unref, watch } from 'vue'
import CanvasView from './canvas-view.vue'
import { imageApi } from '@/api/images'
import { Toast } from 'vant'
import CanvasStore from './canvas/store'
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
        const file: any = ref(null)
        const text = ref('')
        const tipsMessage = computed(() => '识别后的文字是：' + text.value)
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
            visible,
            file,
            text,
            tipsMessage
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
            const file = unref(this.file)
            const formData = new FormData()
            formData.append('file', file)
            Toast({ duration: 0, type: 'loading', message: '文字识别中...' })
            imageApi.analyze(formData).then(res => {
                this.text = res.result ? res.result.slice(0, 1) : ''
                Toast.clear()
                this.$nextTick(() => {
                    const viewRef: any = this.$refs.canvasViewRef
                    viewRef.start({
                        points: CanvasStore.getter.savePath,
                        text: this.text
                    })
                })
            })
        },
        handleLeave () {
            this.text = ''
            const viewRef: any = this.$refs.canvasViewRef
            viewRef.clearCanvas()
        },
        open (file: File) {
            this.file = file
            this.visible = true

        },
        close () {
            this.visible = false
        }
    }
})
</script>
