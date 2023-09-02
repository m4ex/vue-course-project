<script setup>
// DONE: Task 02-components/05-MeetupAgenda
// DONE: add <UiIcon> component
import { computed } from 'vue';
import UiIcon from '@/components/UiIcon.vue';

/**
 * Словарь заголовков по умолчанию для всех типов пунктов программы
 */
const agendaItemDefaultTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

const props = defineProps({
  agendaItem: {
    type: Object,
    required: true,
  },
});
const title = computed(() =>
  props.agendaItem.title ? props.agendaItem.title : agendaItemDefaultTitles[props.agendaItem.type],
);
const timeInterval = computed(() => `${props.agendaItem.startsAt} - ${props.agendaItem.endsAt}`);
</script>

<template>
  <div class="agenda-item">
    <div class="agenda-item__col">
      <UiIcon :icon="agendaItemIcons[props.agendaItem.type]" class="icon" />
    </div>
    <div class="agenda-item__col">{{ timeInterval }}</div>
    <div class="agenda-item__col">
      <h3 class="agenda-item__title">
        {{ title }}
      </h3>
      <p v-if="agendaItem.type === 'talk'" class="agenda-item__talk">
        <span>{{ agendaItem.speaker }}</span>
        <span class="agenda-item__dot"></span>
        <span class="agenda-item__lang"> {{ agendaItem.language }}</span>
      </p>
      <p v-if="agendaItem.description">{{ agendaItem.description }}</p>
    </div>
  </div>
</template>

<style scoped>
/* _agenda-item.css */
.agenda-item {
  padding: 24px 0;
  display: flex;
  flex-direction: row;
  font-size: 18px;
  line-height: 28px;
}

.agenda-item__col:nth-child(1) {
  flex: 1 0 48px;
  max-width: 48px;
}

.agenda-item__col:nth-child(2) {
  flex: 115px;
  max-width: 115px;
  color: var(--blue);
  white-space: nowrap;
}

.agenda-item__col:nth-child(3) {
  flex: 1 0 calc(100% - 48 - 115);
  max-width: calc(100% - 48 - 115);
  padding-left: 24px;
}

.agenda-item__title {
  font-weight: 700;
  font-size: 18px;
  line-height: 28px;
}

.agenda-item__lang {
  font-style: italic;
}

.agenda-item__dot::before {
  content: '•';
  color: var(--grey);
  padding: 0 1ch;
}

.agenda-item__talk {
  margin-top: 16px;
  margin-bottom: 0;
}

@media all and (min-width: 992px) {
  .agenda-item {
    padding: 40px 0;
  }
}
</style>
