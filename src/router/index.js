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
        path: '/center',
        component: () => import("@/views/PersonalCenter.vue"),
    },
    {
        path: '/EvalData',
        component: () => import("@/views/TestData.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 1. 如果有保存的滚动位置（如返回上一页），使用 savedPosition
        if (savedPosition) {
            return savedPosition;
        }

        // 2. 如果 path 变化了（即真正的页面跳转），回到顶部
        if (to.path !== from.path) {
            return { left: 0, top: 0 };
        }

        // 3. 如果只是 query 变化，不改变滚动条位置
        return false;
    }
});

export function setup(app) {
    app.use(router);
}
