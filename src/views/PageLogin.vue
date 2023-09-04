<script setup>
// DONE: Task 05-vue-router/01-AuthPages
// DONE: Добавить именованные маршруты
import { ref } from 'vue';
import UiFormGroup from '../components/UiFormGroup.vue';
import UiLink from '../components/UiLink.vue';
import UiInput from '../components/UiInput.vue';
import UiButton from '../components/UiButton.vue';
import UiForm from '../components/UiForm.vue';
import LayoutAuth from '@/components/LayoutAuth.vue';

// DONE: <title> "Вход | Meetups"
import { useTitle } from '@vueuse/core';
import { loginUser } from '@/api/authApi';
import { useApi } from '@/composables/useApi';
import { router } from '@/router';
import { useAuthStore } from '@/stores/useAuthStore';

useTitle('Вход | Meetups');
// DONE: Добавить LayoutAuth

/*
  DONE: Добавить обработчик сабмита
        - В случае успешной аутентификации:
          - Перейти на главную страницу или from (Task 05-vue-router/01-AuthPages)
          - Вывести тост "Авторизация прошла успешно"
        - В случае неуспешной аутентификации:
          - Вывести тост "Неверные учётные данные..."
 */

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const { request } = useApi(loginUser, {
  successToast: 'Авторизация прошла успешно',
  errorToast: 'Неверные учётные данные...',
});

const login = async () => {
  const result = await request({ email: email.value, password: password.value });
  if (result.success) {
    authStore.setUser(result.data);
    await router.push({ name: 'meetups' });
  }
};
</script>

<template>
  <LayoutAuth>
    <UiForm @submit="login">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" placeholder="demo@email" required autocomplete="username" />
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput
          v-model="password"
          name="password"
          type="password"
          placeholder="password"
          required
          autocomplete="current-password"
        />
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit" block>Войти</UiButton>
      </template>

      <template #append>
        Нет аккаунта?
        <UiLink :to="{ name: 'register' }" class="link">Зарегистрируйтесь</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>

<style scoped></style>
