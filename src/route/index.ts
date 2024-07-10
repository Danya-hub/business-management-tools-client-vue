import {createRouter, createWebHistory, RouteLocationNormalized, Router, RouteRecordRaw} from "vue-router";

import emitter from "@/utils/emitter.ts";

export const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'home',
    redirect: {
        name: 'tool',
        params: {
            tool_name: 'settings',
        }
    },
}, {
    path: '/tool/:tool_name',
    name: 'tool',
    component: () => import("@/components/views/User/Tools.vue")
}, {
    path: '/service/:service_name',
    name: 'service',
    component: () => import("@/components/views/User/Services.vue")
}, {
    path: '/signin',
    name: 'signin',
    component: () => import("@/components/views/User/Signin/Signin.vue")
}, {
    path: '/signup',
    name: 'signup',
    component: () => import("@/components/views/User/Signup/Signup.vue")
}];
export const authPagePaths: string[] = ['/signin', '/signup'];

const router: Router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to: RouteLocationNormalized) => {
    emitter.emit('viewLoading', true);

    if (!authPagePaths.includes(to.path as string) && !localStorage.getItem('isAuth')) {
        router.replace({
            path: '/signin',
            replace: true,
        });
    }
});

router.afterEach(() => {
    emitter.emit('viewLoading', false);
});

export default router;