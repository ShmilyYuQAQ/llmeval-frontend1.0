import ModelDetail from '@/components/ModelDetail.vue';
import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        component: () => import("@/views/GuidePage.vue"),
    },
    {
        path: "/login",
        component: () => import("@/components/Login.vue"),
    },
    {
        path: "/news",
        component: () => import("@/components/ModelNewsContent.vue"),
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
        path: '/model-detail/:name',
        name: 'ModelDetail',
        component: ModelDetail,
        props: true, // 将路由参数作为组件的 props 传递
    },
    {
        path: '/PersonalCenter',
        component: () => import("@/views/PersonalCenter.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export function setup(app) {
    app.use(router);
}
