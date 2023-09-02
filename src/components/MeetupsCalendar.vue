<template>
  <UiCalendarView>
    <template #default="{ date }">
      <UiCalendarEvent v-for="meetup in meetupsByDate(date)" :key="meetup.id" tag="a" :href="`/meetups/${meetup.id}`">
        {{ meetup.title }}
      </UiCalendarEvent>
    </template>
  </UiCalendarView>
</template>

<script>
// DONE: Task 04-vue-cli/04-MeetupsCalendar + 10-slots/03-UiCalendarView

import UiCalendarView from '@/components/UiCalendarView.vue';
import UiCalendarEvent from '@/components/UiCalendarEvent.vue';

export default {
  name: 'MeetupsCalendar',

  components: {
    UiCalendarEvent,
    UiCalendarView,
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  methods: {
    meetupsByDate(date) {
      return this.meetups.filter((meetup) => meetup.date === date);
    },
  },
};
</script>

<style scoped></style>
