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
        requiresAuth: true,
    },
    component: () => import("@/components/views/User/Tools.vue")
}, {
    path: '/service/:service_name',
    name: 'service',
    meta: {
        requiresAuth: true,
    },
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
    const path = to.path as string;

    emitter.emit('viewLoading', true);

    const viewRequiresAuth: boolean = to.meta.requiresAuth as boolean;
    const isAuth: boolean = authPagePaths.includes(path)
        && !!Number(localStorage.getItem('user_id'));
    const isGuest: boolean = !authPagePaths.includes(path)
        && !Number(localStorage.getItem('user_id'))
        && viewRequiresAuth;

    if (isGuest) {
        router.replace({
            path: '/signin',
            replace: true,
        });
    }

    if (isAuth) {
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