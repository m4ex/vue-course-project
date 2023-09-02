<template>
  <ul class="agenda">
    <li class="agenda__item">
      <MeetupAgendaItem v-for="item in agenda" :agendaItem="item" />
    </li>
  </ul>
</template>

<script>
// DONE: Task 02-components/05-MeetupAgenda
import { defineComponent } from 'vue';
import MeetupAgendaItem from '@/components/MeetupAgendaItem.vue';

export default defineComponent({
  name: 'MeetupAgenda',
  props: { agenda: { type: Array, required: true } },
  components: { MeetupAgendaItem },
});
</script>

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
