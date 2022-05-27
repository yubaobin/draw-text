<template>
    <div class="error-view">
        <div class="error-text">
            <p>发布成功 :)</p>
            <div class="error-btn">
                <d-text @click="gotoPreview">预览(跳转预览页面才可分享)</d-text>
            </div>
            <div class="error-btn">
                <d-text @click="gotoEdit">再写一个</d-text>
            </div>
        </div>
        <svg-anim fonts="新年快乐" />
    </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import SvgAnim from '@/components/svg-anim/index.vue'

const router = useRouter()
const route = useRoute()

function gotoPreview () {
    const query = route.query
    router.replace({ name: 'Preview', query })
}
function gotoEdit () {
    router.replace({ name: 'DrawText' })
}
</script>
