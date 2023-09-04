import { httpClient } from './httpClient/httpClient.js';

/**
 * Загрузить изображение
 * @param {File} file - HTML File с изображением
 * @returns {Promise<ResultContainer<ImageDto>>}
 */
export function postImage(file) {
  // DONE: реализовать функцию
  return httpClient.post('/images/upload', file)
}
