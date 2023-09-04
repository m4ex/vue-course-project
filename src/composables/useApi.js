import { ref } from 'vue';
import { useProgress } from "@/plugins/progress";
import { useToaster } from "@/plugins/toaster";

/*
  DONE: Реализовать компосабл для отправки запросов
        - Подразумевается, что в нём будут использоваться функции, возвращающие промис с ResultContainer
        - Но вы можете использовать и другой подход
        - Task composition/useApi
 */

/**
 * @template T
 * @typedef {function(...[*]): Promise<ResultContainer<T>>} IApiFunction
 */

/**
 * @template T
 * @template {IApiFunction<T>} K
 * @typedef IUseApiReturn
 * @param {Ref<ResultContainer<T>>} result - Реактивный результат
 * @param {Ref<boolean>} isLoading - Реактивный флаг загрузки
 * @param {K} request - Функция запуска запроса
 */

/**
 * Компосабл для выполнения запросов в компонентах
 * Добавляет опциональную интеграцию с прогресс баром и тостером для отображения результата
 * Возвращает реактивные переменные с результатом
 *
 * @template T
 *
 * @param {IApiFunction<T>} apiFunc - функция, выполняющая запрос к API, и возвращающая промис с
 * @param {object} options
 * @param {boolean=false} [options.showProgress] - показывать ли прогресс загрузки через Progress плагин
 * @param {boolean|string=false} [options.successToast] - В случае успешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @param {boolean|string=false} [options.errorToast] - В случае неуспешного запроса показывать ли текст из ответа (true) или конкретную строку (string)
 * @return {IUseApiReturn<T, typeof apiFunc>}
 */
export function useApi(apiFunc, { showProgress = false, successToast = false, errorToast = false } = {}) {
  const result = ref(null);
  const isLoading = ref(false);
  const toast = useToaster()
  const progress = useProgress()


  function handleSuccess(message) {
    if (successToast) {
      toast.success( typeof successToast === "string" ? successToast : message);
    }
    if (showProgress) {
      progress.finish();
    }
  }

  const handleError = function( errorMessage) {
    if (errorToast) {
      toast.error( typeof errorToast === "string"? errorToast : errorMessage);
    }
    if (showProgress) {
      progress.fail();
    }
  }
  const request = async (...args) => {
    isLoading.value = true;
    if (showProgress) {
      progress.start();
    }
    try {
      result.value = await apiFunc.apply(this, args);
      if (result.value.success) {
        handleSuccess(result.value.data);
      } else {
        handleError(result.value.error.message);
      }
    } catch (error) {
      handleError(error.message)
    }
    isLoading.value = false;
    return result.value;
  };



  return {
    request,
    result,
    isLoading,
  };
}
