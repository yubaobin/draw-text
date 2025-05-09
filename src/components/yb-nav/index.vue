<template>
    <div class="ybnav-container" ref="navRef">
        <div class="ybnav-wrapper">
            <div class="ybnav-item" @click="clearBg">
                <div class="nav-icon">
                    <svg-icon :icon-name="bgIcon" />
                </div>
                <div class="nav-name">背景</div>
            </div>
            <div class="ybnav-item" v-for="(item, index) in list" :key="index" @click="$emit('click', item)">
                <div class="nav-cover" v-if="item.cover">
                    <img :src="item.cover" />
                </div>
                <div class="nav-icon" v-else>
                    <svg-icon :icon-name="item.icon" />
                </div>
                <div class="nav-name" v-if="item.name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import type { PropType, Ref } from 'vue'
import { computed, defineComponent, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import YbNav from 'ybnav'
import CanvasStore from '@/views/draw-text/canvas/store'
import { FILL_COLOR } from '@/views/draw-text/canvas/util'

let ybNav: YbNav | null

export default defineComponent({
    name: 'YbNav',
    emits: ['click'],
    props: {
        list: {
            type: Array as PropType<Array<NormalItem>>,
            default () {
                return [] as Array<any>
            }
        }
    },
    setup () {
        const navRef: Ref<Element | null> = ref(null)
        const bgIcon = computed(() => {
            if (CanvasStore.getter.background) {
                return 'close'
            } else {
                return 'bg'
            }
        })
        function clearBg () {
            CanvasStore.action.setBackground(FILL_COLOR)
        }
        onMounted(() => {
            if (navRef.value) {
                ybNav = new YbNav(navRef.value, {})
            }
        })
        onUpdated(() => {
            if (ybNav) {
                ybNav.refresh()
            }
        })
        onBeforeUnmount(() => {
            if (ybNav) {
                ybNav.destroy()
                ybNav = null
            }
        })
        return {
            navRef,
            bgIcon,
            clearBg
        }
    }
})
</script>
