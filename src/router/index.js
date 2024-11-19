import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("@/views/GuidePage.vue"),
    },
    {
        path: "/home",
        component: () => import("@/views/Homepage.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export function setup(app) {
    app.use(router);
}
