<template>
    <Uploader v-model="fileList" :after-read="afterRead"/>
</template>
<script lang="ts" setup>
import { imageApi } from '@/api/images'
import { Uploader } from 'vant'
import { Ref, ref } from 'vue'

const fileList: Ref<Array<any>> = ref([{
    url: 'http://169.254.158.99:4000/api/v2/image/download/1643163745295.png?token=1231',
    isImage: true
}])

function afterRead (file: any) {

    file.status = 'uploading'
    file.message = '上传中...'

    const formData = new FormData()
    formData.append('file', file.file)
    
    imageApi.upload(formData).then(res => {
        if (res.code === 0) {
            file.status = ''
            file.message = ''
        } else {
            file.status = 'failed'
            file.message = res.message
        }
    })
}
</script>
