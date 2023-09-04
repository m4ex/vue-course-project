<script setup>
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';
import { useTitle } from '@vueuse/core';
import LayoutMeetupForm from '@/components/LayoutMeetupForm.vue';
import { router } from "@/router";
import { useMeetupFetch } from "@/composables/useMeetupFetch";
import { useMeetupFormSubmit } from "@/composables/useMeetupFormSubmit";

const props = defineProps({
  meetupId: {
    type: Number,
    required: true,
  },
});
// DONE: <title> "Редактирование митапа | Meetups"
useTitle('Редактирование митапа | Meetups');
// DONE: Добавить LayoutMeetupForm

const { meetup } = useMeetupFetch(props.meetupId);


// DONE: При сабмите формы редактирования митапа - обновить его через API и перейти на страницу изменённого митапа
const submitForm = useMeetupFormSubmit('edit')

// DONE: При нажатии на "Отмена" вернуться на страницу этого митапа
async function cancel() {
  await router.push({ name: "meetup", params: { meetupId: meetup.value.id } });
}
</script>

<template>
  <LayoutMeetupForm>
    <MeetupForm v-if="meetup" :meetup="meetup" @submit="submitForm" @cancel="cancel" submit-text="Сохранить"/>
    <UiContainer v-else>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  </LayoutMeetupForm>
</template>

<style scoped></style>
