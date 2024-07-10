import {createApp} from 'vue';
import {createPinia} from 'pinia';
import { install as reCaptcha } from "vue3-recaptcha-v2";

import {reCaptchaKey} from "~/config/process.ts";
import "@/lib/yup.ts";
import './style.css';

import App from './App.vue';

import router from '@/route/index.ts';
import {i18n} from "@/hooks/useLang.ts";

const store = createPinia();
const app = createApp(App);

app.use(reCaptcha, {
    sitekey: reCaptchaKey,
    cnDomains: false,
})
app.use(i18n);
app.use(store);
app.use(router);
app.mount('#app');
