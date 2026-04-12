<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    <v-footer app class="bg-grey-lighten-1">
      <v-container class="text-center">
        © {{ new Date().getFullYear() }} ПоходПлан. Планируй походы с удовольствием.
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import Header from '~/components/Layout/Header.vue'

//инициализация проверки авторизации при загрузке
const authStore = useAuthStore()
onMounted(() => {
  authStore.checkAuth()
})
</script>