/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { router } from "@/router";
import { createPinia } from 'pinia';
import { createToaster } from "@/plugins/toaster";
import { createProgress } from "@/plugins/progress";

// DONE: установить плагины: router, pinia, head(title), toaster, progress
// вместо head(title) будет useTitle from '@vueuse/core'
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(createToaster());
app.use(createProgress({ router }));
app.mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
