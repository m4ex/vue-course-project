<script setup>
// DONE: Task 06-wrappers/01-UiLink

defineProps({
  tag: { type: [String, Object], default: 'router-link' },
})
</script>

<template>
  <component :is="$props.tag" class="link">
    <slot />
  </component>
</template>

<style scoped>
/* _link.css */
.link {
  color: var(--blue);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
