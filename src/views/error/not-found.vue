<template>
    <div class="error-view">
        <div class="error-text">
            <p>没找到这个字呢 :(</p>
            <div>
                <d-text @click="gotoEdit">去写一个</d-text>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function gotoEdit () {
    router.push({ name: 'DrawText' })
}
</script>
