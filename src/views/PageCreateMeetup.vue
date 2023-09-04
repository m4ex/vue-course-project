<script setup>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import { createMeetup } from '../services/meetupService.js';
import { useTitle } from "@vueuse/core";
import { router } from "@/router";
import { useApi } from "@/composables/useApi";
import { postMeetup } from "@/api/meetupsApi";


// DONE: title "Создание митапа | Meetups"
useTitle("Создание митапа | Meetups")
// DONE: Добавить LayoutMeetupForm
const meetup = ref(createMeetup());

// DONE: При сабмите формы создания митапа - добавить его через API и перейти на страницу созданного митапа
const { request, result } = useApi(postMeetup, {
  errorToast: true,
});

async function submit() {
  await request(meetup.value);
  if (result.success) {
    await router.push({ name: "meetup", params: { meetupId: result.data.id } });
  }
}

// DONE: При нажатии на "Отмена" вернуться на главную страницу
function cancel() {
  router.push({ name: 'index' });
}

</script>

<template>
  <LayoutMeetupForm>
    <MeetupForm :meetup="meetup" @submit="submit" @cancel="cancel" />
  </LayoutMeetupForm>
</template>

<style scoped></style>
