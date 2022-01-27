<template>
    <div class="error-view">
        <div class="error-text">
            <p>发布成功 :)</p>
            <div class="error-btn">
                <d-text @click="gotoPreview">预览</d-text>
            </div>
            <div class="error-btn">
                <d-text @click="gotoEdit">再写一个</d-text>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
function gotoPreview () {
    const query = route.query
    router.push({ name: 'Preview', query })
}
function gotoEdit () {
    router.replace({ name: 'DrawText' })
}
</script>
