<template>
    <div class="ybnav-container" ref="navRef">
        <div class="ybnav-wrapper">
            <div class="ybnav-item" v-for="(item, index) in list" :key="index" @click="$emit('click', item)">
                <div class="nav-icon">
                    <svg-icon :icon-name="item.icon"/>
                </div>
                <div class="nav-name">{{ item.name }}</div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, onUpdated, PropType, Ref, ref } from 'vue'
import YbNav from 'ybnav'
let ybNav: YbNav | null
export interface NormalItem {
    icon?: string;
    name: string;
    code?: string;
}
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
        onMounted(() => {
            if (navRef.value) {
                ybNav = new YbNav(navRef.value, {})
            }
        })
        onUpdated (() => {
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
            navRef
        }
    }
})
</script>
