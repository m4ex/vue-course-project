import { httpClient } from './httpClient/httpClient.ts';

/**
 * Загрузить изображение
 * @param {File} file - HTML File с изображением
 * @returns {Promise<ResultContainer<ImageDto>>}
 */
export function postImage(file) {
  // DONE: реализовать функцию
  const formData = new FormData();
  formData.append('file', file);
  return httpClient.post('/images/upload', formData)
}
