import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/draw-text'
    },
    {
        path: '/404',
        name: 'error404',
        component: () => import(/* webpackChunkName: "error" */ '../views/error/not-found.vue')
    },
    {
        path: '/success',
        name: 'success',
        component: () => import(/* webpackChunkName: "error" */ '../views/preview/success.vue')
    },
    {
        path: '/draw-text',
        name: 'DrawText',
        component: () => import(/* webpackChunkName: "draw-text" */ '../views/draw-text/index.vue')
    },
    {
        path: '/preview',
        name: 'Preview',
        component: () => import(/* webpackChunkName: "preview" */ '../views/preview/index.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue')
    },
    {
        path: '/manage-image',
        name: 'ManageImage',
        component: () => import(/* webpackChunkName: "manage-image" */ '../views/manage-image/index.vue')
    }
]

const bseUrl = (import.meta.env['VITE_publicpath'] || '') as string

function createAppRouter () {
    const isHistory = import.meta.env['VITE_router'] === 'history'
    return createRouter({
        history: isHistory ? createWebHistory(bseUrl) : createWebHashHistory(),
        routes,
        strict: true,
        scrollBehavior: () => ({ left: 0, top: 0 })
    })
}

export const router = createAppRouter()

/**
 * 注册
 * @param app
 */
export function setupRouter (app: App<Element>) {
    app.use(router)
}
