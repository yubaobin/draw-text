import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
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
    },
    {
        path: '/test',
        name: 'Test',
        component: () => import(/* webpackChunkName: "test" */ '../views/draw-text/test-view.vue')
    }
]

const isHistory = import.meta.env['VITE_router'] === 'history'
const bseUrl = (import.meta.env['VITE_publicpath'] || '') as string
const router = createRouter({
    history: isHistory ? createWebHistory(bseUrl) : createWebHashHistory(),
    routes
})

export default router