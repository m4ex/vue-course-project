<script setup>
import LayoutBase from './components/LayoutBase.vue';
import UiAlert from './components/UiAlert.vue';
import { httpClient } from './api/httpClient/httpClient.js';
import { useToaster } from '@/plugins/toaster';
import { useAuthStore } from '@/stores/useAuthStore';

// DONE: для авторизованных пользователей - запросить новые данные пользователя для актуализации и проверки актуальности
const authStore = useAuthStore();
if (authStore.isAuthenticated) {
  authStore.refreshUser();
}

httpClient.onUnauthenticated(async () => {
  // DONE: сессия пользователя больше не валидна - нужна обработка потери авторизации
  console.log('unauthenticated');
  await authStore.logout();
  location.reload();
});

const toast = useToaster();
httpClient.onNetworkError(() => {
  // DONE: проблема с сетью, стоит вывести тост пользователю
  toast.error('Ошибка сети');
});

// DONE: обработка глобальных ошибок - необработанные исключения можно залогировать и вывести тост
// DONE: глобальные ошибки можно поймать событиями "error" и "unhandledrejection"
window.addEventListener('error', (error) => onErrorResponse(error));
window.addEventListener('unhandledrejection', (event) => onErrorResponse(event.reason));

function onErrorResponse(event) {
  console.error("global error handler",event);
  toast.error(event.message);
}
</script>

<template>
  <LayoutBase>
    <RouterView>
      <template #default="{ Component }">
        <!-- MYCOMMENT добавил в исключение PageMeetups чтобы корректно отображался статус участия после возврата со страницы митапа -->
        <KeepAlive v-if="Component" :max="3" exclude="PageMeetups">
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
