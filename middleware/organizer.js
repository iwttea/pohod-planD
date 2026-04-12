export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  authStore.checkAuth()
  
  if (!authStore.isOrganizer && !authStore.isAdmin) {
    return navigateTo('/')
  }
})