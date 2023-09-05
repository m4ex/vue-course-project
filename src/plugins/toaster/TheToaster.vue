<script setup lang="ts">
// DONE: Task 04-vue-router/02-TheToaster
import UIToast from '@/plugins/toaster/UIToast.vue';
import { ref } from 'vue';

defineExpose({ success, error });

const toasts = ref<Array<{ id:Number, type:ToastType, message: String }>>([]);
const counter = ref(0);

function success(message: string) {
  newToast(message, 'success', 5000);
}

function error(message: string) {
  newToast(message, 'error', 5000);
}

type ToastType = 'success' | 'error';

function newToast(message: string, type: ToastType, timeout: number) {
  toasts.value.push({ id: counter.value, type: type, message: message });
  setTimeout(
    (id: number) => {
      toasts.value = toasts.value.filter(function (obj) {
        return obj.id !== id;
      });
    },
    timeout,
    counter.value,
  );
  counter.value = counter.value++;
}
</script>

<template>
  <div class="toasts">
    <UIToast v-for="toast in toasts" :key="toast.id" :message="toast.message" :type="toast.type" />
  </div>
</template>

<style scoped>
/* _toaster.css */
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}

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
