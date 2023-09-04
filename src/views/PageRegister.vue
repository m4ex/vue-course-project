<script setup>
// DONE: Task 05-vue-router/01-AuthPages
// DONE: Добавить именованные маршруты
import { ref } from 'vue';
import UiFormGroup from '@/components/UiFormGroup.vue';
import UiInput from '@/components/UiInput.vue';
import UiCheckbox from '@/components/UiCheckbox.vue';
import UiLink from '@/components/UiLink.vue';
import UiButton from '@/components/UiButton.vue';
import UiForm from '@/components/UiForm.vue';
import LayoutAuth from '@/components/LayoutAuth.vue';
import { useTitle } from '@vueuse/core';
import { useToaster } from '@/plugins/toaster';
import { useApi } from '@/composables/useApi';
import { registerUser } from '@/api/authApi';
import { router } from '@/router';

// DONE: <title> "Регистрация | Meetups"
useTitle('Регистрация | Meetups');
// DONE: Добавить LayoutAuth

const email = ref('');
const fullname = ref('');
const password = ref('');
const password2 = ref('');
const agree = ref(false);

const validate = () => {
  if (password.value !== password2.value) {
    return 'Пароли не совпадают';
  }
  if (!agree.value) {
    return 'Требуется согласится с условиями';
  }
};

const toast = useToaster();
const { request, result } = useApi(registerUser, { successToast: 'Регистрация выполнена успешно', errorToast: true });

const handleSubmit = async () => {
  const validationError = validate();
  if (validationError) {
    // DONE: Вывести тост с текстом ошибки
    toast.error(validationError);
    return;
  }
  /*
      DONE: Добавить обработчик сабмита
            - В случае успешной регистрации:
              - Перейти на страницу входа (Task 05-vue-router/01-AuthPages)
              - Вывести тост "Регистрация выполнена успешно"
            - В случае неуспешной регистрации:
              - Вывести тост с текстом ошибки с API
     */
  await request({ email: email.value, fullname: fullname.value, password: password.value });
  if (result.value?.success) {
    await router.push({ name: 'login' });
  }
};
</script>

<template>
  <LayoutAuth>
    <UiForm @submit="handleSubmit">
      <UiFormGroup label="Email">
        <UiInput v-model="email" name="email" type="email" required autocomplete="username"/>
      </UiFormGroup>
      <UiFormGroup label="Имя">
        <UiInput v-model="fullname" name="fullname" required autocomplete="username"/>
      </UiFormGroup>
      <UiFormGroup label="Пароль">
        <UiInput v-model="password" name="password" type="password" required minlength="6" autocomplete="new-password"/>
      </UiFormGroup>
      <UiFormGroup label="Повтор пароля">
        <UiInput v-model="password2" type="password" required minlength="6" autocomplete="new-password"/>
      </UiFormGroup>
      <UiFormGroup>
        <UiCheckbox v-model="agree" name="agree" required>Я согласен с условиями</UiCheckbox>
      </UiFormGroup>

      <template #buttons>
        <UiButton variant="primary" type="submit">Зарегистрироваться</UiButton>
      </template>

      <template #append>
        Уже есть аккаунт?
        <UiLink :to="{ name: 'login' }">Войдите</UiLink>
      </template>
    </UiForm>
  </LayoutAuth>
</template>
