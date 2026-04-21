export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Если пользователь уже авторизован, перенаправляем на главную
  if (authStore.isAuthenticated) {
    return navigateTo('/')
  }
})