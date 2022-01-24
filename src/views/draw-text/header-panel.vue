<template>
    <div class="header-panel">
        <d-text @click="$emit('click', 'preview')">预览</d-text>
        <div class="tips-right">
            <d-text @click="$emit('click', 'clear')">清空</d-text>
        </div>
    </div>
</template>
<script lang="ts" setup>
    defineEmits(['click'])
</script>
