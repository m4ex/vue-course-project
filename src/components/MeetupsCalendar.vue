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
  computed: {
    meetupsByDate() {
      const result = {};
      for (const meetup of this.meetups) {
        if (!result[meetup.date]) {
          result[meetup.date] = [meetup];
        } else {
          result[meetup.date].push(meetup);
        }
      }
      return result;
    },
  },
};
</script>

<style scoped></style>
