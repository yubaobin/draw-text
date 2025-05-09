<template>
    <div class="d-text" v-bind="$attrs" :style="textStyle">
        <div class="d-text-inner">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { toPx } from '@/utils'
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'DText',
    props: {
        underline: Boolean,
        fontSize: [Number, String]
    },
    setup (props) {
        const textStyle = computed(() => {
            return {
                fontSize: toPx(props.fontSize)
            }
        })

        return {
            textStyle
        }
    }
})
</script>

<style lang="less" scoped>
.d-text {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    position: relative;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: var(--van-font-size-md);
    font-weight: 500;
}
</style>
