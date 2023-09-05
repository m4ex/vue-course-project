<script setup lang="ts">
import UiIcon from '@/components/UiIcon.vue';
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, required: true },
  message: { type: String, required: true },
});
const typeClass = computed(() => {
  return `toast_${props.type}`;
});
const icon = computed(() => {
  switch (props.type) {
    case 'error':
      return 'alert-circle';
    case 'success':
      return 'check-circle';
    default:
      return '';
  }
});
</script>

<template>
  <div class="toast" :class="typeClass">
    <UiIcon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
  </div>
</template>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
