<template>
    <div class="tool-panel">
        <yb-nav class="bottom-nav" :list="navList" @click="handleClick"/>
    </div>
</template>
<script lang="ts" setup>
import YbNav, { NormalItem } from '@/components/yb-nav/index.vue'
import { reactive } from 'vue'
import { imageApi } from '@/api/images/index'
const navList: Array<NormalItem> = reactive([
    { icon: 'bg', name: '背景', code: 'bg' }
])

function loadImageList () {
    imageApi.getImageListByPage().then((res) => {
        console.log(res.result.data)
    })
}

loadImageList()

function handleClick (item: NormalItem) {
    const { code } = item
    switch (code) {
        case 'bg':
            handleBg()
            break
    }
}

function handleBg () {
    
}
</script>
