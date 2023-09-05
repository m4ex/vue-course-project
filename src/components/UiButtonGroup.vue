<script setup>
import { toRef, provide } from "vue";

const props = defineProps({
  modelValue: {
    required: true
  }
});

function setModelValue(value) {
  emits("update:modelValue", value);
}

provide('UiButtonGroupModel', toRef(props, 'modelValue'))
provide('UiButtonGroupSetModel', setModelValue)

const emits = defineEmits( ["update:modelValue"])
</script>

<template>
  <div class="button-group" role="group">
    <slot></slot>
  </div>
</template>

<style scoped>
/* _button-group.css */
.button-group {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  white-space: nowrap;
}
</style>
