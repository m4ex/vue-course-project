<script setup>
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import { httpClient } from './api/httpClient/httpClient.js';
import { useToaster } from '@/plugins/toaster';

import { onMounted, onUnmounted } from 'vue';
import { router } from '@/router';
import { getUser, loginUser } from '@/api/authApi';
import { useApi } from '@/composables/useApi';
import { useAuthStore } from '@/stores/useAuthStore';

// DONE: для авторизованных пользователей - запросить новые данные пользователя для актуализации и проверки актуальности
const authStore = useAuthStore();
if (authStore.isAuthenticated) {
  authStore.refreshUser();
}

httpClient.onUnauthenticated(() => {
  // DONE: сессия пользователя больше не валидна - нужна обработка потери авторизации
  authStore.setUser(null);
  router.push({ name: 'login' });
});

const toast = useToaster();
httpClient.onNetworkError(() => {
  // DONE: проблема с сетью, стоит вывести тост пользователю
  toast.error('Ошибка сети');
});

// DONE: обработка глобальных ошибок - необработанные исключения можно залогировать и вывести тост
// DONE: глобальные ошибки можно поймать событиями "error" и "unhandledrejection"
onMounted(() => window.addEventListener('error', onErrorResponse));
onUnmounted(() => window.removeEventListener('error', onErrorResponse));
onMounted(() => window.addEventListener('unhandledrejection', onErrorResponse));
onUnmounted(() => window.removeEventListener('unhandledrejection', onErrorResponse));

function onErrorResponse(event) {
  console.error(event);
  toast.error(event.reason);
}
</script>

<template>
  <LayoutBase>
    <RouterView>
      <template #default="{ Component }">
        <KeepAlive v-if="Component" :max="3">
          <component :is="Component" />
        </KeepAlive>
      </template>
      <template #fallback>
        <UiAlert>Загрузка...</UiAlert>
      </template>
    </RouterView>
  </LayoutBase>
</template>

<style>
/* Основные глобальные стили - не scoped стили  */
/* app.css */
@import url('./assets/styles/_variables.css');
@import url('./assets/styles/_fonts.css');
@import url('./assets/styles/_common.css');
</style>
