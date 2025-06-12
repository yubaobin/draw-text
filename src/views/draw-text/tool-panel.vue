<template>
    <div class="tool-panel">
        <yb-nav class="bottom-nav" :list="navList" @click="handleClick" />
    </div>
</template>
<script lang="ts" setup>
import { imageApi } from '@/api/images'
import YbNav from '@/components/yb-nav/index.vue'
import CanvasStore from './canvas/store'
import { type Ref, ref } from 'vue'
import { getToken } from '@/utils/token'

const navList: Ref<Array<NormalItem>> = ref([])

getBgList()

function getBgList () {
    const token = getToken()
    imageApi.getImageListByList().then((res) => {
        navList.value = (res.result || []).map((item: NormalItem) => {
            return { cover: item.cover + '?token=' + token, fileurl: item.fileurl }
        })
    })
}

function handleClick (item: NormalItem) {
    CanvasStore.action.setBackground(item.fileurl || '')
}
</script>
