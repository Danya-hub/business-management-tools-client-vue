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
    meta: {
        forAuth: true,
    },
    component: () => import("@/components/views/User/Tools.vue")
}, {
    path: '/service/:service_name',
    name: 'service',
    meta: {
        forAuth: true,
    },
    component: () => import("@/components/views/User/Services.vue")
}, {
    path: '/signin',
    name: 'signin',
    meta: {
        forGuest: true,
    },
    component: () => import("@/components/views/User/Signin/Signin.vue")
}, {
    path: '/signup',
    name: 'signup',
    meta: {
        forGuest: true,
    },
    component: () => import("@/components/views/User/Signup/Signup.vue")
}, {
    path: '/forget-password',
    name: 'forget-password',
    meta: {
        forGuest: true,
    },
    component: () => import("@/components/views/User/ForgetPassword/ForgetPassword.vue")
}];

const router: Router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach((to: RouteLocationNormalized) => {
    emitter.emit('viewLoading', true);

    const blockAuthPages: boolean = !!Number(localStorage.getItem('user_id'))
        && to.meta.forGuest as boolean;
    const requireAuth: boolean = !Number(localStorage.getItem('user_id'))
        && to.meta.forAuth as boolean;

    if (requireAuth) {
        router.replace({
            path: '/signin',
            replace: true,
        });
    }

    if (blockAuthPages) {
        router.replace({
            path: '/',
            replace: true,
        });
    }
});

router.afterEach(() => {
    emitter.emit('viewLoading', false);
});

export default router;