import { createRouter, createWebHistory } from "vue-router";

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
