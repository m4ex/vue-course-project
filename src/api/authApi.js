import { httpClient } from './httpClient/httpClient.js';

/**
 * Получить текущего пользователя
 * @returns {Promise<ResultContainer<User>>}
 */
export function getUser() {
  // DONE: реализовать функцию
  return httpClient.get('/auth/user');
}

/**
 * Авторизоваться по email и паролю
 * @param {string} email
 * @param {string} password
 * @returns {Promise<ResultContainer<User>>}
 */
export function loginUser(user) {
  return httpClient.post('/auth/login', user);
}

/**
 * Зарегистрировать пользователя
 * @param {Object} user
 * @returns {Promise<ResultContainer<User>>}
 */
export function registerUser(user) {
  // DONE: реализовать функцию
  return httpClient.post('/auth/register', user);
}

/**
 * Разлогинить пользователя сессии
 * @returns {Promise<ResultContainer<void>>}
 */
export function logoutUser() {
  // DONE: реализовать функцию
  return httpClient.post('/auth/logout');
}
