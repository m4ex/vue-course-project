<script setup>
// DONE: Task 06-wrappers/06-UiInputDate

import UiInput from '@/components/UiInput.vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { computed, ref } from "vue";

dayjs.extend(utc);

const props = defineProps({
  type: { type: String, default: 'date' },
  modelValue: { type: Number, default: null },
  step: { type: String, default: '1' },
});

const UiInputRef = ref()
const modelValueProxy = computed({
  get: () => {
    if (props.modelValue == null) {
      return '';
    }
    switch (props.type) {
      case 'date':
        return dayjs(props.modelValue).utc().format('YYYY-MM-DD');
      case 'datetime-local':
        return dayjs(props.modelValue).utc().format('YYYY-MM-DD HH:mm');
      default:
        return dayjs(props.modelValue).utc().format('HH:mm');
    }
  },
  set: () => {
    // TODO проверить работу
    emit('update:modelValue', UiInputRef.value.$refs.input.valueAsNumber);
  },
});

const emit = defineEmits(['update:modelValue']);
</script>

<template>
  <UiInput ref="UiInputRef" v-model="modelValueProxy" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>
