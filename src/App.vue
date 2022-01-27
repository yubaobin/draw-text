<template>
    <router-view />
    <Overlay :show="show" @click="close">
        <div class="share-page">
            <div class="right-tips">
                右上角分享
            </div>
        </div>
    </Overlay>
</template>
<script lang="ts" setup>
import { Overlay } from 'vant'
import { computed } from 'vue'
import store from './store/index'
const show = computed(() => {
    return store.getter.showShare
})
function close () {
    store.action.setShare(false)
}
</script>

