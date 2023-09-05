import { useAuthStore } from "@/stores/useAuthStore";

/** @implements {import('vue-router').NavigationGuard} */
export function authGuard(to, from, next){
  const { isAuthenticated } = useAuthStore()
  if (to.meta.requireAuth && !isAuthenticated) {
    next({ name: "login", query: { from: to.fullPath } });
  } else if (to.meta.requireGuest && isAuthenticated) {
    next({ name: "meetups" });
  } else {
    next();
  }
}
