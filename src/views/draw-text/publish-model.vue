<template>
    <van-dialog
        v-model:show="show"
        title="有点东西要确认一下"
        show-cancel-button
        confirmButtonText="发布"
        :before-close="beforeClosePublish">
        <div class="tips-container">
            <template v-if="loading">
                <div class="tips-message">
                    <span class="text">文字识别中...</span>
                    <van-loading />
                </div>
            </template>
            <template v-else>
                <div class="tips-message">
                    <div class="text" @click="openEdit">{{ tipsMessage }}</div>
                    <van-icon class="icon-btn" name="edit" @click="openEdit" />
                    <van-icon class="icon-btn" name="replay" @click="refresh" />
                </div>
            </template>
        </div>
    </van-dialog>
    <van-dialog v-model:show="showEdit" title="请输入你的文字" show-cancel-button :before-close="beforeCloseEdit">
        <div class="tips-container-v2">
            <div class="d-input">
                <input class="d-input__inner" v-model="result" />
                <div class="err-msg" v-if="errMsg">{{ errMsg }}</div>
            </div>
        </div>
    </van-dialog>
</template>
<script lang="ts" setup>
import { imageApi } from '@/api/images'
import { showToast, showNotify, closeToast } from 'vant'
import { computed, type Ref, ref } from 'vue'
import { textApi } from '@/api/text'
import CanvasStore from './canvas/store'
import { useRouter } from 'vue-router'
import { FILL_COLOR } from './canvas/util'

const router = useRouter()
const show = ref(false)
const text = ref('')
const result = ref('')
const checked = ref(false)
const loading = ref(false)
const tipsMessage = computed(() => '识别后的文字是：' + text.value)
const showEdit = ref(false)
function openEdit () {
    showEdit.value = true
}

const errMsg = computed(() => {
    return result.value.length > 4 ? '太长了 :(' : ''
})

function beforeCloseEdit (action: string) {
    if (action === 'confirm') {
        if (!!errMsg.value) {
            return false
        }
        text.value = result.value
    } else if (action === 'cancel') {
        result.value = text.value
    }
    return true
}

function beforeClosePublish (action: string) {
    if (action === 'confirm') {
        const points = JSON.stringify(CanvasStore.getter.savePath)
        showToast({ type: 'loading', message: '发布中..' })
        textApi
            .addText({ points, text: result.value, background: CanvasStore.getter.background || FILL_COLOR })
            .then((res) => {
                closeToast()
                if (res.code === 0) {
                    router.push({ name: 'success', query: { textid: res.result?.id } })
                } else {
                    showToast({ type: 'fail', message: '发布失败' })
                }
            })
            .catch(() => {
                showToast({ type: 'fail', message: '发布失败' })
            })
    }
    return true
}

const saveFile: Ref<any> = ref(null)
function refresh () {
    const formData = new FormData()
    formData.append('file', saveFile.value)
    loading.value = true
    imageApi
        .analyze(formData)
        .then((res) => {
            loading.value = false
            if (res.code === 0) {
                text.value = res.result ? res.result.slice(0, 1) : ''
            } else {
                showNotify({ type: 'warning', duration: 3000, message: '识别失败' })
                text.value = ''
            }
            result.value = text.value
        })
        .catch(() => {
            loading.value = false
            showNotify({ type: 'warning', duration: 3000, message: '识别失败' })
        })
}

defineExpose({
    open (file: File) {
        show.value = true
        saveFile.value = file
        refresh()
    },
    close () {
        show.value = false
        checked.value = false
    }
})
</script>
