<template>
    <div class="manage-view">
        <PullRefresh @refresh="onRefresh" v-model="refreshing">
            <List
                v-model:loading="loadingMore"
                :finished="loadingFinished"
                :finished-text="finishedText"
                @load="loadMore">
                <div class="img-list">
                    <template v-for="item in list" :key="item.id">
                        <SwipeCell>
                            <div class="card-item">
                                <div class="card-inner">
                                    <img :src="item.fileurl + '?token=1231'" />
                                </div>
                            </div>
                            <template #right>
                                <Button
                                    square
                                    text="删除"
                                    type="danger"
                                    @click="handleDelete(item.id)"
                                    class="delete-button" />
                            </template>
                        </SwipeCell>
                    </template>
                </div>
            </List>
        </PullRefresh>
        <div class="bottom-container">
            <Uploader :after-read="afterRead" style="width: 100%">
                <Button block>
                    <Icon name="plus" />
                </Button>
            </Uploader>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { PageQuery } from '#/axios'
import { imageApi } from '@/api/images'
import { PullRefresh, Button, Icon, List, Uploader, SwipeCell, showToast, Dialog } from 'vant'
import { ref, reactive, type Ref } from 'vue'

interface Query extends PageQuery {
    type: string
}

interface ImageItem {
    id: string
    fileurl: string
    cover: string
    type: string
}

const refreshing = ref(false)
const loadingMore = ref(false)
const loadingFinished = ref(false)
const finishedText = '没有更多了'

const query: Query = reactive({
    type: '1',
    current: 0,
    size: 10
})

const total = ref(0)

const list: Ref<Array<ImageItem>> = ref([])

function loadEnd () {
    refreshing.value = false
    loadingMore.value = false
}

function done () {
    refreshing.value = false
    loadingMore.value = false
    loadingFinished.value = true
}

function loadMore () {
    query.current += 1
    loadingMore.value = true
    search()
}

function onRefresh () {
    list.value = []
    query.current = 0
    loadingFinished.value = false
    loadMore()
}

function search () {
    loadingFinished.value = false
    imageApi.getImageListByPage(query).then((res) => {
        total.value = res.result.total
        const result: Array<any> = res.result.data
        list.value = list.value.concat(result)
        loadEnd()
        if (!(list.value.length < total.value)) {
            done()
        }
    })
}

function afterRead (file: any) {
    const formData = new FormData()
    formData.append('file', file.file)
    imageApi.upload(formData).then((res) => {
        if (res.code === 0) {
            imageApi.addImage({ fileurl: res.result, cover: res.result }).then(() => {
                onRefresh()
            })
        }
    })
}

function handleDelete (id: string) {
    Dialog.confirm({
        title: '确认',
        message: '确认要删除吗？'
    })
        .then(() => {
            imageApi.deleteImage(id).then((res) => {
                if (res.code === 0) {
                    onRefresh()
                } else {
                    showToast({
                        type: 'fail',
                        message: res.message
                    })
                }
            })
        })
        .catch(() => {})
}
</script>
<style lang="less" scoped>
@bottom-height: 54px;

.manage-view {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding-bottom: @bottom-height;
    box-sizing: border-box;
    overflow: auto;
    background-color: fade(@primary, 10);

    .img-list {
        .card-item {
            padding: 0 16px;
            margin-bottom: 4px;

            .card-inner {
                border-radius: 16px;
                overflow: hidden;
                padding: 16px;
                background-color: @white;
            }

            img {
                width: 100%;
                display: block;
            }
        }
    }

    .bottom-container {
        position: fixed;
        padding: 4px 16px;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
    }

    .delete-button {
        height: 100%;
    }
}
</style>
