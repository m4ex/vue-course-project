<script setup>
// DONE: Task 02-components/05-MeetupAgenda
import MeetupAgendaItem from '@/components/MeetupAgendaItem.vue';

defineProps({ agenda: { type: Array, required: true } });
</script>

<template>
  <ul class="agenda">
    <li class="agenda__item">
      <MeetupAgendaItem v-for="item in agenda" :agendaItem="item" />
    </li>
  </ul>
</template>

<style scoped>
/* _agenda.css */
.agenda {
  margin: 0;
  padding: 0;
  list-style: none;
}

.agenda__item {
  border-top: 1px solid var(--grey-3);
}

.agenda__item:first-child {
  border-top: none;
}
</style>
