<template>
  <v-app-bar color="white" elevation="1">
    <v-container class="d-flex align-center">
      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer;">
        <span class="text-h6 font-weight-bold">
          <img src="/img/logo.png" alt="ПоходПлан" style="height: 32px; margin-right: 8px; vertical-align: middle;">
          ПоходПлан
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn to="/" variant="text">Все походы</v-btn>
      <v-btn to="/my" variant="text">Мои походы</v-btn>
      <v-btn 
        to="/trips/create" 
        variant="text" 
        v-if="authStore.isOrganizer || authStore.isAdmin"
      >
        Создать поход
      </v-btn>

      <!-- Профиль -->
      <v-menu v-if="authStore.isAuthenticated">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :title="authStore.user?.fio" subtitle="Профиль" to="/profile"></v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="authStore.logout()">
            <v-icon left>mdi-logout</v-icon>
            Выйти
          </v-list-item>
        </v-list>
      </v-menu>
      
      <template v-else>
        <v-btn to="/login" variant="text" class="mr-2">
          Войти
        </v-btn>
        <v-btn to="/register" variant="tonal" color="success">
          Регистрация
        </v-btn>
      </template>
    </v-container>
  </v-app-bar>
</template>

<script setup>
const authStore = useAuthStore()
</script>