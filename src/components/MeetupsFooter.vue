<script setup>
// DONE: Добавить имя автора проекта :)
import UiContainer from './UiContainer.vue';
</script>

<template>
  <footer class="footer">
    <UiContainer>&copy;m4ex 2022-{{ new Date().getFullYear() }}</UiContainer>
  </footer>
</template>

<style scoped>
/* _footer.css */
.footer {
  padding: 100px 0 60px;
  text-align: center;
}
</style>
