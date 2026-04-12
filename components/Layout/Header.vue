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

      <!---профиль --->
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
      
      <v-btn v-else icon @click="dialog = true">
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-container>

    <!---диалог при входе --->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Вход в систему</v-card-title>
        <v-card-text>
          <v-alert type="info" class="mb-3">
            Тестовые логины: admin, org, user<br>
            Пароль любой
          </v-alert>
          <v-text-field 
            label="Логин" 
            v-model="login" 
            prepend-icon="mdi-account"
            @keyup.enter="doLogin"
          ></v-text-field>
          <v-text-field 
            label="Пароль" 
            type="password" 
            v-model="password"
            prepend-icon="mdi-lock"
            @keyup.enter="doLogin"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="dialog = false">Отмена</v-btn>
          <v-btn color="primary" @click="doLogin">Войти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script setup>
const authStore = useAuthStore()
const dialog = ref(false)
const login = ref('')
const password = ref('')

const doLogin = () => {
  const success = authStore.login(login.value, password.value)
  if (success) {
    dialog.value = false
    login.value = ''
    password.value = ''
  } else {
    alert('Неверный логин или пароль')
  }
}
</script>