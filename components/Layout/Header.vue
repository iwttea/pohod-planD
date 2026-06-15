<template>
  <v-app-bar elevation="2" class="app-header">
    <v-container class="d-flex align-center">

      <!-- ЛОГО -->
      <div class="logo" @click="$router.push('/')">
        <img src="/img/logo1.png" class="logo-img" />
        <span class="logo-text">ПоходПлан</span>
      </div>

      <v-spacer />

      <!-- НАВИГАЦИЯ -->
      <div class="nav-links">
        <v-btn to="/" variant="text">Все походы</v-btn>
        <v-btn to="/my" variant="text" v-if="authStore.isAuthenticated">Мои</v-btn>

        <v-btn
          to="/trips/create"
          variant="text"
          v-if="authStore.isOrganizer || authStore.isAdmin"
          prepend-icon="mdi-plus"
        >
          Создать
        </v-btn>

        <v-btn
          to="/admin"
          variant="text"
          v-if="authStore.isAdmin"
          prepend-icon="mdi-shield-account"
        >
          Админ
        </v-btn>
      </div>

      <!-- ТЕМА -->
      <v-btn icon class="mx-2" @click="toggleTheme">
        <v-icon>
          mdi-theme-light-dark
        </v-icon>
      </v-btn>

      <!-- ПРОФИЛЬ -->
      <v-menu v-if="authStore.isAuthenticated">
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar size="32" color="primary">
              <span class="text-white text-caption">
                {{ initials }}
              </span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card min-width="220">
          <v-list>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">
                {{ authStore.user?.fio }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ authStore.user?.role_name }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-divider />

            <v-list-item to="/profile">
              Профиль
            </v-list-item>

            <v-list-item @click="authStore.logout()">
              Выйти
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- НЕ АВТОРИЗОВАН -->
      <template v-else>
        <v-btn to="/login" variant="text">Войти</v-btn>
        <v-btn to="/register" color="success" variant="tonal">
          Регистрация
        </v-btn>
      </template>

    </v-container>
  </v-app-bar>
</template>

<script setup>
import { useTheme } from 'vuetify'

const authStore = useAuthStore()
const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === 'dark' ? 'light' : 'dark'
}

// инициалы для аватарки
const initials = computed(() => {
  const name = authStore.user?.fio || ''
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
})
</script>

<style scoped>
.app-header {
  backdrop-filter: blur(10px);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.logo-img {
  height: 34px;
  width: 34px;
  object-fit: contain;
  display: block;
}

.logo-text {
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
}

.nav-links {
  display: flex;
  gap: 4px;
}

.v-btn {
  text-transform: none;
}


</style>