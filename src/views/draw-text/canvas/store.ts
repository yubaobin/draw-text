import type { ICanvasState, IPoint } from '#/canvas'
import { computed, reactive, readonly } from 'vue'

const state: ICanvasState = reactive({
    strokeColor: '#f0d294',
    savePath: [],
    isOpr: false,
    text: '',
    background: ''
})

const action = {
    setStrokeColor: (strokeColor: string) => {
        state.strokeColor = strokeColor
    },
    setSavePath: (setSavePath: Array<Array<IPoint>>) => {
        state.savePath = setSavePath.slice(0)
    },
    setIsOpr: (isOpr: boolean) => {
        state.isOpr = isOpr
    },
    setText: (text: string) => {
        state.text = text
    },
    setBackground: (background: string) => {
        state.background = background
    },
    clearSavePath: () => {
        state.savePath = []
    },
    reset: () => {
        state.strokeColor = '#f0d294'
        state.savePath = []
        state.isOpr = false
        state.text = ''
        state.background = ''
    }
}

const getter = readonly({
    strokeColor: computed(() => state.strokeColor),
    savePath: computed(() => state.savePath),
    isOpr: computed(() => state.isOpr),
    text: computed(() => state.text),
    background: computed(() => state.background)
})

export default {
    getter,
    action
}
