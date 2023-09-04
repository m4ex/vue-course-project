// DONE:  Task ProgressPlugin

import { createApp, inject } from "vue";
import TheTopProgressBar from "./TheTopProgressBar.vue";

// Используйте эту константу в качестве ключа provide/inject
export const PROGRESS_KEY = Symbol("PROGRESS_KEY");

// Функция для удобного внедрения с Composition API
export function useProgress() {
  return inject(PROGRESS_KEY);
}

export function createProgress({ container, router } = {}) {
  if (!container) {
    container = document.body.appendChild(document.createElement("div"));
  }
  const progressUI = createApp(TheTopProgressBar).mount(container);

  function start(loader) {
    progressUI.start(loader);
  }

  function finish(loader) {
    progressUI.finish(loader);
  }

  function fail() {
    progressUI.fail();
  }

  if (router) {
    router.beforeEach((to, from, next) => {
      start(to.fullPath);
      next();
    });
    router.afterEach((to, from) => {
      finish(to.fullPath);
    });
    router.onError((error) => {
      fail();
    });
  }

  return {
    start,
    finish,
    fail,
    install(app) {
      const progress = this;
      app.provide(PROGRESS_KEY, progress);
      app.config.globalProperties.$progress = progress;
      app.component("TheTopProgressBar", TheTopProgressBar);
    }
  };
}
