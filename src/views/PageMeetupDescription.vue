<script setup>
defineProps({
  meetup: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <MeetupDescription :description="meetup.description" />
</template>

<style scoped></style>
