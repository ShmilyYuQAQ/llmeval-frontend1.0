import { createRouter, createWebHistory } from "vue-router";
import ModelDetail from '@/components/ModelDetail.vue'; // 确保路径正确

const routes = [
    {
        path: "/",
        component: () => import("@/views/GuidePage.vue"),
    },
    {
        path: "/home",
        component: () => import("@/views/Homepage.vue"),
    },
    {
        path: "/news",
        component: () => import("@/components/ModelNewsContent.vue"),
    },
    {
        path: '/model-detail',
        name: 'ModelDetail',
        component: ModelDetail
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export function setup(app) {
    app.use(router);
}
