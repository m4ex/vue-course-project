<script setup>
// DONE: Task 04-vue-cli/04-MeetupsCalendar + 10-slots/03-UiCalendarView

import { computed } from 'vue';
import UiCalendarView from "@/components/UiCalendarView.vue";
import UiCalendarEvent from "@/components/UiCalendarEvent.vue";

const props = defineProps({
  meetups: {
    type: Array,
    required: true,
  },
});

const meetupsByDate = computed(() => {
  const result = {};
  for (const meetup of props.meetups) {
    if (!result[meetup.date]) {
      result[meetup.date] = [meetup];
    } else {
      result[meetup.date].push(meetup);
    }
  }
  return result;
});
</script>

<template>
  <UiCalendarView>
    <template v-slot="{ timestamp }">
      <UiCalendarEvent
        v-for="meetup in meetupsByDate[timestamp]"
        :key="meetup.id"
        tag="RouterLink"
        :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
      >
        {{ meetup.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<style scoped></style>
