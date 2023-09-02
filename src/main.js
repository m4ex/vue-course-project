/**
 * main.js - главная точка входа (entrypoint)
 * Именно в этом файле запускается и инициализируется всё приложение
 */

import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router/index.js';
import { createPinia } from 'pinia';
import { createToaster } from './plugins/toaster/index.js';
import { createProgress } from './plugins/progress/index.js';


// TODO: установить плагины: router, pinia, head(title), toaster, progress
const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(createToaster());
app.use(createProgress());
app.mount('#app');

// В этом же файле при необходимости можно сделать всё, что требуется делать ещё до создания приложения,
// или что не относится к Vue приложению и UI
