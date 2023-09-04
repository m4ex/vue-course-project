<script setup>
import { ref } from 'vue';
import MeetupForm from '../components/MeetupForm.vue';
import { createMeetup } from "@/services/meetupService";
import { useTitle } from "@vueuse/core";
import { router } from "@/router";
import LayoutMeetupForm from "@/components/LayoutMeetupForm.vue";
import { useMeetupFormSubmit } from "@/composables/useMeetupFormSubmit";


// DONE: title "Создание митапа | Meetups"
useTitle("Создание митапа | Meetups")
// DONE: Добавить LayoutMeetupForm
const meetup = ref(createMeetup());

// DONE: При сабмите формы создания митапа - добавить его через API и перейти на страницу созданного митапа
const submitForm = useMeetupFormSubmit('create')

// DONE: При нажатии на "Отмена" вернуться на главную страницу
function cancel() {
  router.push({ name: 'index' });
}
</script>

<template>
  <LayoutMeetupForm>
    <MeetupForm :meetup="meetup" @submit="submitForm" @cancel="cancel" submit-text="Создать" />
  </LayoutMeetupForm>
</template>

<style scoped></style>
