<script setup>
import MeetupDescription from "@/components/MeetupDescription.vue";

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
