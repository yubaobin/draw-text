<template>
    <transition name="slide-in" @after-enter="handleEnter" @after-leave="handleLeave">
        <div class="preview-container" ref="previewRef" v-show="visible">
            <div class="preview-header">
                {{ tipsMessage }}
            </div>
            <div class="preivew-body bg-wrapper" :style="styles">
                <svg-view v-if="isSvg" ref="svgViewRef"/>
                <canvas-view v-else ref="canvasViewRef"/>
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
import SvgView from './svg-view.vue'
import { imageApi } from '@/api/images'
import { Toast } from 'vant'
import CanvasStore from './canvas/store'
import { FILL_COLOR, formatBg } from './canvas/util'
function stop (e: any) {
    e.stopPropagation()
}

export default defineComponent({
    components: {
        CanvasView,
        SvgView
    },
    setup () {
        const previewRef: Ref<HTMLDivElement | null> = ref(null)
        const visible = ref(false)
        const file: any = ref(null)
        const text = ref('')
        const tipsMessage = computed(() => '识别后的文字是：' + text.value)
        const isSvg = computed(() => !!text.value)
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

        const styles = computed(() => {
            return formatBg(CanvasStore.getter.background || FILL_COLOR)
        })

        return {
            previewRef,
            visible,
            file,
            text,
            isSvg,
            tipsMessage,
            styles
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
                this.startRun()
            }).catch(() => {
                Toast.clear()
                this.text = ''
                this.startRun()
            })
        },
        startRun () {
            this.$nextTick(() => {
                const viewRef: any = this.isSvg ? this.$refs.svgViewRef : this.$refs.canvasViewRef
                viewRef.start({
                    points: CanvasStore.getter.savePath,
                    text: this.text
                })
            })
        },
        handleLeave () {
            this.text = ''
            const viewRef: any = this.isSvg ? this.$refs.svgViewRef : this.$refs.canvasViewRef
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
