import { ICanvasState, IPoint } from 'types/canvas'
import { computed, reactive, readonly } from 'vue'

const state: ICanvasState = reactive({
    strokeColor: '#f0d294',
    savePath: [],
    isOpr: false,
    text: ''
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
    clearSavePath: () => {
        state.savePath = []
    },
    reset: () => {
        state.strokeColor = '#f0d294'
        state.savePath = []
        state.isOpr = false
        state.text = ''
    }
}

const getter = readonly({
    strokeColor: computed(() => state.strokeColor),
    savePath: computed(() => state.savePath),
    isOpr: computed(() => state.isOpr),
    text: computed(() => state.text)
})

export default {
    getter,
    action
}