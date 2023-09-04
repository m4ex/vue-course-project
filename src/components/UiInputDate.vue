<template>
  <UiInput ref="UiInput" v-model="modelValueProxy" :type="type">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
// DONE: Task 06-wrappers/06-UiInputDate

import UiInput from '@/components/UiInput.vue';
import UiIcon from '@/components/UiIcon.vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default {
  name: 'UiInputDate',
  components: { UiInput, UiIcon },
  props: {
    type: { type: String, default: 'date' },
    modelValue: { type: Number, default: null },
    step: { type: String, default: '1' },
  },
  computed: {
    modelValueProxy: {
      get() {
        if (this.modelValue == null) {
          return '';
        }
        switch (this.type) {
          case 'date':
            return dayjs(this.modelValue).utc().format('YYYY-MM-DD');
          case 'datetime-local':
            return dayjs(this.modelValue).utc().format('YYYY-MM-DD HH:mm');
          default:
            return dayjs(this.modelValue).utc().format('HH:mm');
        }
      },
      set() {
        this.$emit('update:modelValue', this.$refs.UiInput.$refs.input.valueAsNumber);
      },
    },
  },
  emits: ['update:modelValue'],
};
</script>
