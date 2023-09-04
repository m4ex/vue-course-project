// DONE: Task 05-vue-router/03-ScrollBehavior

/** @implements {import('vue-router').RouterScrollBehavior} */
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  } else if (to.meta.saveScrollPosition && from.meta.saveScrollPosition) {
    return;
  } else if (to.hash) {
    return {
      el: to.hash,
    };
  } else {
    return { top: 0, left: 0 };
  }
}
