<template>
    <div class="header-panel">
        <d-text @click="$emit('click', 'preview')">预览</d-text>
        <div class="tips-right">
            <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect" placement="bottom-end">
                <template #reference>
                    <d-text>更多</d-text>
                    <van-icon name="arrow" />
                </template>
            </van-popover>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue'
defineEmits(['click'])

const vm = getCurrentInstance()
const showPopover = ref(false)

const actions = [
    { text: '清空', code: 'clear' },
    { text: '发布', code: 'public' }
]
const onSelect = (action: any) => {
    if (vm) {
        switch (action.code) {
            case 'clear':
                vm.emit('click', 'clear')
                break
            case 'public':
                vm.emit('click', 'public')
                break
        }
    }
}
</script>
