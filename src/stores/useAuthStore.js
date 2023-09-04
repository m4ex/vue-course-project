import { defineStore } from 'pinia';
import { computed } from 'vue';
import { getUser, logoutUser } from "@/api/authApi";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage("user",null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = (value) => {
    user.value = value;
  };

  // DONE: Добавить метод актуализации данных пользователя с API
  const refreshUser = async () => {
    const result = await getUser();
    if (result.success) {
      setUser(result.data);
    }
  };
  const logout = async () => {
    const { success } = await logoutUser();
    if (success) {
      setUser(null);
    }
  };

  return {
    user,
    isAuthenticated,
    setUser,
    refreshUser,
    logout
  };
});
