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
        path: "/details/:id", // 动态路由，:id 是一个动态段
        name: "Detail",
        component: () => import("@/views/GuidePage.vue"),
    },
    {
        path: '/model-detail/:modelName',
        name: 'ModelDetail',
        component: ModelDetail,
        props: true, // 将路由参数作为组件的 props 传递
    },
    {
        path: '/ProfileContent',
        component: () => import("@/components/ProfileContent.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export function setup(app) {
    app.use(router);
}
