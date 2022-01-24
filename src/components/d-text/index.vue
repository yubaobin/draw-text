<template>
    <div class="d-text" v-bind="$attrs">
        <div class="d-text-inner">
            <slot></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'DText',
    setup () {
        
    }
})
</script>
