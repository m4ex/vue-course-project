<script setup>
import { onMounted, ref } from "vue";
import MeetupForm from '../components/MeetupForm.vue';
import UiAlert from '../components/UiAlert.vue';
import UiContainer from '../components/UiContainer.vue';
import { useTitle } from '@vueuse/core';
import LayoutMeetupForm from '@/components/LayoutMeetupForm.vue';
import { useApi } from "@/composables/useApi";
import { getMeetup, postMeetup, putMeetup } from "@/api/meetupsApi";
import { router } from "@/router";

const props = defineProps({
  meetupId: {
    type: Number,
    required: true,
  },
});
// DONE: <title> "Редактирование митапа | Meetups"
useTitle('Редактирование митапа | Meetups');
// DONE: Добавить LayoutMeetupForm

const meetup = ref(null);
const { request: getRequest, result: getResult } = useApi(getMeetup, {
  errorToast: true,
});
onMounted(async () => {
  await getRequest(props.meetupId);
  meetup.value = getResult.data;
})

// DONE: При сабмите формы редактирования митапа - обновить его через API и перейти на страницу изменённого митапа
const { request: putRequest, result: putResult } = useApi(putMeetup, {
  errorToast: true,
});

async function submit() {
  await putRequest(meetup.value);
  if (putResult.success) {
    await router.push({ name: "meetup", params: { meetupId: result.data.id } });
  }
}
// DONE: При нажатии на "Отмена" вернуться на страницу этого митапа
async function cancel() {
  await router.push({ name: "meetup", params: { meetupId: meetup.value.id } });
}
</script>

<template>
  <LayoutMeetupForm>
    <MeetupForm v-if="meetup" :meetup="meetup" />
    <UiContainer v-else>
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>
  </LayoutMeetupForm>
</template>

<style scoped></style>
