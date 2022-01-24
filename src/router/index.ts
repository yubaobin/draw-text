import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/draw-text'
    },
    {
        path: '/draw-text',
        name: 'DrawText',
        component: () => import(/* webpackChunkName: "draw-text" */ '../views/draw-text/index.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue')
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router