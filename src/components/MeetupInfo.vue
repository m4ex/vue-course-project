<script setup>
// DONE: Task 02-components/03-MeetupInfo
// DONE: Add <UiIcon>
// DONE: Add date utils

import { computed } from 'vue';
import UiIcon from '@/components/UiIcon.vue';

const props = defineProps({
  organizer: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Number, required: true },
});

const isoDate = computed(() => new Date(props.date).toISOString().split('T')[0]);
const localDate = computed(() =>
  new Date(props.date).toLocaleString(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
);
</script>

<template>
  <ul class="meetup-info">
    <li>
      <UiIcon class="icon meetup-info__icon" icon="user" />
      {{ organizer }}
    </li>
    <li>
      <UiIcon class="icon meetup-info__icon" icon="map" />
      {{ place }}
    </li>
    <li>
      <UiIcon class="icon meetup-info__icon" alt="icon" icon="cal-lg" />
      <time :datetime="isoDate">{{ localDate }}</time>
    </li>
  </ul>
</template>

<style scoped>
/* _meetup-info.css */

.meetup-info {
  margin: 0;
  padding: 0;
}

.meetup-info li {
  list-style-type: none;
  position: relative;
  padding-left: 36px;
  font-size: 18px;
  line-height: 28px;
  margin: 0 0 8px;
}

.meetup-info li:last-child {
  margin: 0;
}

.meetup-info__icon {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
