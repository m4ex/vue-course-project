<script setup>
// DONE: Task 10-slots/03-UiCalendarView

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { computed, ref } from 'vue';

dayjs.extend(utc);

const selectedDate = ref(new dayjs().utc());

const selectedMonth = computed(() => {
  return selectedDate.value.toDate().toLocaleDateString(navigator.language, {
    month: 'long',
    year: 'numeric',
  });
});
const firstDayOfMonth = computed(() => {
  return selectedDate.value.startOf('month');
});
const lastDayOfMonth = computed(() => {
  return selectedDate.value.endOf('month').startOf('day');
});
const lastDayOfPreviousMonth = computed(() => {
  return selectedDate.value.subtract(1, 'months').endOf('month').startOf('day');
});
const firstDayOfWeekIndex = computed(() => {
  return firstDayOfMonth.value.day() === 0 ? 6 : firstDayOfMonth.value.day() - 1;
});
const lastDayOfWeekIndex = computed(() => {
  return lastDayOfMonth.value.day() === 0 ? 6 : lastDayOfMonth.value.day() - 1;
});
const daysArray = computed(() => {
  const daysArray = [];
  for (let i = firstDayOfWeekIndex.value - 1; i >= 0; i -= 1) {
    daysArray.push({
      day: lastDayOfPreviousMonth.value.subtract(i, 'day').date(),
      thisMonth: false,
      timestamp: formatDate(lastDayOfPreviousMonth.value.subtract(i, 'day')),
    });
  }
  for (let i = 1; i <= lastDayOfMonth.value.date(); i += 1) {
    daysArray.push({ day: i, thisMonth: true, timestamp: formatDate(firstDayOfMonth.value.add(i - 1, 'day')) });
  }
  for (let i = 1; i <= 6 - lastDayOfWeekIndex.value; i += 1) {
    daysArray.push({
      day: i,
      thisMonth: false,
      timestamp: formatDate(firstDayOfMonth.value.add(1, 'month').add(i - 1, 'day'))
    });
  }
  return daysArray;
});

function nextMonth() {
  selectedDate.value = selectedDate.value.add(1, 'month');
}

function previousMonth() {
  selectedDate.value = selectedDate.value.subtract(1, 'month');
}

function formatDate(date) {
  return +date.toDate();
}
</script>

<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="previousMonth"
        ></button>
        <div class="calendar-view__date">{{ selectedMonth }}</div>
        <button class="calendar-view__control-right" type="button" aria-label="Next month" @click="nextMonth"></button>
      </div>
    </div>
    <div class="calendar-view__grid">
      <div
        v-for="i in daysArray"
        :key="i"
        class="calendar-view__cell"
        :class="{ 'calendar-view__cell_inactive': !i.thisMonth }"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ i.day }}</div>
        <div class="calendar-view__cell-content">
          <slot :date="i.day" :timestamp="i.timestamp" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* _calendar-view.css */
.calendar-view {
}

.calendar-view__controls {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
