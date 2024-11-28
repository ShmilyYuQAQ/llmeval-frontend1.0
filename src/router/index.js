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
        path: "/details/:id", // 动态路由，:id 是一个动态段
        name: "Detail",
        component: () => import("@/views/GuidePage.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export function setup(app) {
    app.use(router);
}
