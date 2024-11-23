import { createRouter, createWebHistory } from "vue-router";
import ModelDetail from '@/components/ModelDetail.vue'; // 确保路径正确

const routes = [
    {
        path: "/",
        component: () => import("@/components/Login.vue"),
    },
    {
        path: "/guide",
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
        component: ModelDetail,
    },
    {
        path: '/ProfileContent',
        component: () => import("@/components/ProfileContent.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export function setup(app) {
    app.use(router);
}
