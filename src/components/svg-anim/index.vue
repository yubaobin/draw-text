<template>
     <div class="svg-wrapper">
        <svg class="svg-anim" viewBox="0 0 375 120">
            <path ref="happyPathRef" id="happy-path" transform="translate(0, 30)"
                d="M0,34.5422363 C47.6335836,11.7415365 81.0348897,0.341186523 100.203918,0.341186523 C172.098344,0.341186523 212.608178,72.0298462 257.023193,72.0298462 C328.811253,72.0298462 375,34.5422363 375,34.5422363"
            />
            <template v-for="(item, index) in fontList" :key="getKey(index, 'anim')">
                <animateMotion v-bind:xlink:href='item.animId' fill="freeze" rotate="auto" :begin="item.begin" :dur="item.dur" calcMode="discrete" repeatCount="indefinite">
                    <mpath xlink:href="#happy-path"/>
                </animateMotion>
                <text :id="item.id" x="-30" y="20" :style="fontStyle">{{ item.text }}</text>
            </template>
        </svg>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, Ref } from 'vue'

interface IAnimItem {
    id: string,
    animId: string,
    begin: string,
    dur: string,
    text: string
}

export default defineComponent({
    props: {
        fonts: {
            type: String as PropType<string>,
            default: ''
        },
        fontSize: {
            type: Number as PropType<number>,
            default: 20
        },
        time: {
            type: Number,
            default: 4
        }
    },
    setup (props) {
        const fontList: Ref<Array<IAnimItem>> = ref([])
        function initFontList () {
            const list = props.fonts.split('').reverse()
            fontList.value = list.map((item: string, index: number): IAnimItem => {
                const id = getFontId(index)
                return {
                    id,
                    animId: '#' + id,
                    begin: getBegin(index),
                    dur: `${props.time}s`,
                    text: item
                }
            })
        }
        const fontStyle = computed(() => {
            return {
                'font-size': props.fontSize + 'px'
            }
        })
        function getKey (index: number, type) {
            return `${type}_${index}`
        }
        function getFontId (index: number) {
            return `happy-text${index}`
        }
        function getBegin (index: number): string {
            const pre = index * preTime.value
            return `${pre}s`
        }
        const happyPathRef: Ref<any> = ref(null)
        const preTime: Ref<number> = ref(0.1)
        function changePreTime () {
            const length = happyPathRef.value.getTotalLength()
            const speed = length / props.time
            preTime.value = props.fontSize / speed
        }
        onMounted(() => {
           changePreTime()
           initFontList()
        })
        return {
            fontList,
            getKey,
            getFontId,
            fontStyle,
            getBegin,
            happyPathRef
        }
    }
})
</script>
