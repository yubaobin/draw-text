import type { IGlobalConfig } from '#/module'
import { computed, reactive, readonly } from 'vue'

const state: IGlobalConfig = reactive({
    showShare: false
})

const action = {
    setShare: (share: boolean) => {
        state.showShare = share
    }
}

const getter = readonly({
    showShare: computed(() => state.showShare)
})

export default {
    getter,
    action
}
