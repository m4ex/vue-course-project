<script setup>
// DONE: Task 02-components/02-MeetupDescription
defineProps({
  description: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p class="meetup-description">{{ description }}</p>
</template>

<style scoped>
/* _meetup-description.css */
.meetup-description {
  padding-top: 33px;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}
</style>
