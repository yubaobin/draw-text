import { ICanvasState, IPoint } from 'types/canvas'
import { computed, reactive, readonly } from 'vue'

const state: ICanvasState = reactive({
    strokeColor: '#000',
    savePath: [],
    isOpr: false
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
    clearSavePath: () => {
        state.savePath = []
    },
    reset: () => {
        state.strokeColor = '#000'
        state.savePath = []
        state.isOpr = false
    }
}

const getter = readonly({
    strokeColor: computed(() => state.strokeColor),
    savePath: computed(() => state.savePath),
    isOpr: computed(() => state.isOpr)
})

export default {
    getter,
    action
}