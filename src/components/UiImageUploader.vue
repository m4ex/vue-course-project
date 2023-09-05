<script setup>
// DONE: Task 06-wrappers/05-UiImageUploader

import { computed, ref } from 'vue';

const props = defineProps({
  preview: {
    type: String,
    default: '',
  },
  uploader: {
    type: Function,
    default: null,
  },
});
defineOptions({
  inheritAttrs: false,
});

const isLoading = ref(false);
const localPreview = ref(props.preview);
const input = ref()

const state = computed(() => {
  if (isLoading.value) return 'loading';
  else if (localPreview.value) return 'loaded';
  else return 'empty';
});
const stateText = computed(() => {
  switch (state.value) {
    case 'empty':
      return 'Загрузить изображение';
    case 'loading':
      return 'Загрузка...';
    default:
      return 'Удалить изображение';
  }
});
const emit = defineEmits(['select', 'upload', 'error', 'remove']);

function handleClick() {
  if (state.value === 'loaded') {
    remove();
  } else {
    input.value.click();
  }
}

async function handleSelect() {
  emit('select', input.value.files[0]);
  localPreview.value = URL.createObjectURL(input.value.files[0]);
  if (props.uploader) {
    isLoading.value = true;
    try {
      const resp = await props.uploader(input.value.files[0]);
      emit('upload', resp);
    } catch (e) {
      remove();
      emit('error', e);
    } finally {
      isLoading.value = false;
    }
  }
}

function remove() {
  localPreview.value = '';
  input.value.value = '';
  emit('remove');
}
</script>

<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      @click="handleClick"
      :class="{ 'image-uploader__preview-loading': state === 'loading' }"
      :style="[localPreview ? `--bg-url: url(${localPreview})` : '']"
    >
      <span class="image-uploader__text"> {{ stateText }}</span>
    </label>
    <!--
    Вынес input из label и не стал их связывать чтобы не было проблемы с передачей лишних кликов.
    Возможно есть более правильный способ, у меня побороть проблему модификаторам так и не получилось.
     -->
    <input
      ref="input"
      type="file"
      v-bind="$attrs"
      accept="image/*"
      class="image-uploader__input"
      @change="handleSelect"
    />
  </div>
</template>

<style scoped>
/* _image-uploader.css */

.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
