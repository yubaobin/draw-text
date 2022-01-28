<template>
    <div class="canvas-view" ref="canvasView">

    </div>
</template>
<script lang="ts" setup>
import { getRefPromise } from '@/utils'
import { onMounted, ref, Ref } from 'vue'
import SvgText from './canvas/svg-text'
const canvasView: Ref<HTMLDivElement | null> = ref(null)
let drawText: SvgText | null = null
const points: any = [[{'x':136,'y':114},{'x':136,'y':115},{'x':136,'y':120},{'x':134,'y':134},{'x':131,'y':151},{'x':129,'y':169},{'x':127,'y':187},{'x':127,'y':202},{'x':127,'y':216},{'x':127,'y':232},{'x':128,'y':249},{'x':132,'y':265},{'x':142,'y':279},{'x':154,'y':290},{'x':172,'y':299},{'x':193,'y':304},{'x':218,'y':306},{'x':244,'y':305},{'x':267,'y':298},{'x':283,'y':289},{'x':293,'y':280},{'x':299,'y':273},{'x':302,'y':268},{'x':303,'y':265},{'x':303,'y':262},{'x':303,'y':256},{'x':302,'y':248},{'x':300,'y':239},{'x':297,'y':232},{'x':294,'y':227},{'x':291,'y':222},{'x':286,'y':218},{'x':282,'y':215},{'x':275,'y':213},{'x':268,'y':211},{'x':260,'y':210},{'x':252,'y':210},{'x':243,'y':210},{'x':235,'y':212},{'x':228,'y':216},{'x':219,'y':222},{'x':210,'y':228},{'x':203,'y':234},{'x':197,'y':239},{'x':192,'y':243},{'x':189,'y':246},{'x':187,'y':247},{'x':186,'y':248},{'x':186,'y':248}]]
onMounted(() => {
    getRefPromise(canvasView).then(ref => {
        drawText = new SvgText(ref)
        drawText.start(points, 'ybb')
    })
})
</script>
