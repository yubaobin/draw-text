<template>
    <div
        class="screen-block"
        @touchstart="handleStart"
        @touchmove="handleMove"
        @touchend="handleEnd"
        @mousedown="handleStart"
        @mousemove="handleMove"
        @mouseup="handleEnd">
        <div class="tips-wrapper" v-show="visible">
            <div class="icon">
                <van-icon name="arrow-up" />
            </div>
            <div class="icon">
                <van-icon name="arrow-up" />
            </div>
        </div>
    </div>
    <van-overlay :show="show" @click="close">
        <div class="action-sheet">
            <div class="action-sheet-item" @click="gotoEdit">我也要写一个</div>
            <div class="action-sheet-item" @click="copyToClipboard()">复制链接</div>
        </div>
    </van-overlay>
</template>
<script lang="ts" setup>
import type { IPoint } from '#/canvas'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { copyToClipboard } from '@/utils'
defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})

const router = useRouter()

const show = ref(false)

const dbound = 50
const isDown = ref(false)
const startPos = reactive({
    x: 0,
    y: 0
})

const movePos = reactive({
    x: 0,
    y: 0
})

function open () {
    show.value = true
}

function close () {
    show.value = false
}

function gotoEdit () {
    router.replace({ name: 'DrawText' })
}

function handleStart (e: MouseEvent | TouchEvent) {
    isDown.value = true
    const pos = getPosition(e)
    startPos.x = pos.x
    startPos.y = pos.y
}
function handleMove (e: MouseEvent | TouchEvent) {
    const pos = getPosition(e)
    movePos.x = pos.x
    movePos.y = pos.y
}
function handleEnd () {
    isDown.value = false
    toggleShow(startPos, movePos)
}

function toggleShow (pos1: IPoint, pos2: IPoint) {
    const diffY = pos2.y - pos1.y
    if (diffY > dbound) {
        close()
    } else if (diffY < -dbound) {
        open()
    }
}

function getPosition (e: MouseEvent | TouchEvent): IPoint {
    if (e instanceof TouchEvent) {
        const touch = e.touches[0] // 获取第一个触点
        return { x: touch.pageX, y: touch.pageY }
    } else if (e instanceof MouseEvent) {
        return { x: e.clientX, y: e.clientY }
    } else {
        return { x: 0, y: 0 }
    }
}

defineExpose({
    open,
    close
})
</script>
