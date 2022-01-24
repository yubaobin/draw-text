<template>
    <svg class="svg-icon" aria-hidden="true" v-bind="$attrs">
        <use :xlink:href="svgName" />
    </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'SvgIcon',
    props: {
        iconName: {
            type: String,
            default: ''
        }
    },
    computed: {
        svgName () {
            return `#icon-${this.iconName}`
        }
    }
})
</script>
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
