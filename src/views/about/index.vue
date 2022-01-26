<template>
    <Uploader v-model="fileList" :after-read="afterRead" />
    <img id="text-img" alt="Vue logo" :src="`${baseUrl}chi_sim.png`"/>
    <!-- <button @click="recognize">点击</button> -->
</template>
<script lang="ts" setup>
// import { createWorker, PSM, OEM } from 'tesseract.js'
// import { imageApi } from '@/api/images'
import { Uploader } from 'vant'
import { Ref, ref } from 'vue'

const baseUrl: any = '1231' // import.meta.env['VITE_publicpath']

const fileList: Ref<Array<any>> = ref([
    {
        url: 'http://169.254.158.99:4000/api/v2/image/download/1643163745295.png?token=1231',
        isImage: true
    }
])
// const worker = createWorker({
//     cacheMethod: 'none', // refresh
//     langPath: '/traineddata',
//     logger: (m) => console.log(m)
// })

// async function recognize (file: any) {
//     // const img: any = document.getElementById('text-img')
//     await worker.load()
//     await worker.loadLanguage('eng+chi_sim')
//     await worker.initialize('eng+chi_sim', OEM.LSTM_ONLY)
//     await worker.setParameters({
//         tessedit_pageseg_mode: PSM.SINGLE_BLOCK
//     })
//     const {
//         data: { text }
//     } = await worker.recognize(file)
//     console.log(text)
// }

function afterRead (file: any) {
    file.status = 'uploading'
    file.message = '上传中...'
    // recognize(file.file)
    const formData = new FormData()
    formData.append('file', file.file)

    // imageApi.upload(formData).then((res) => {
    //     if (res.code === 0) {
    //         file.status = ''
    //         file.message = ''
    //     } else {
    //         file.status = 'failed'
    //         file.message = res.message
    //     }
    // })
}

// function getBase64Image (img: any) {
//     var canvas = document.createElement('canvas')
//     canvas.width = img.width
//     canvas.height = img.height
//     var ctx: any = canvas.getContext('2d')
//     ctx.drawImage(img, 0, 0)
//     var dataURL = canvas.toDataURL('image/png')
//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, '')
// }
</script>
