<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="mx-auto" elevation="8">
          <v-card-title class="text-h5 text-center py-4">
            Вход в систему
          </v-card-title>
          
          <v-card-text>
            <v-alert color="success" variant="tonal" class="mb-4">
              Тестовые логины: admin, org, user<br>
              Пароль любой
            </v-alert>
            
            <v-form @submit.prevent="doLogin">
              <v-text-field
                v-model="form.login"
                label="Логин"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                :error-messages="errors.login"
                @keyup.enter="doLogin"
              ></v-text-field>
              
              <v-text-field
                v-model="form.password"
                label="Пароль"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                :error-messages="errors.password"
                @keyup.enter="doLogin"
              ></v-text-field>
              
              <v-btn
                type="submit"
                color="success"
                block
                size="large"
                :loading="loading"
                class="mt-4"
              >
                Войти
              </v-btn>
            </v-form>
            
            <div class="text-center mt-4">
              <span class="text-grey">Нет аккаунта?</span>
              <v-btn
                variant="text"
                color="success"
                to="/register"
              >
                Зарегистрироваться
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
definePageMeta({
  middleware: 'guest'
})

const authStore = useAuthStore()
const router = useRouter()
const loading = ref(false)

const form = ref({
  login: '',
  password: ''
})

const errors = ref({})

const doLogin = async () => {
  errors.value = {}
  
  if (!form.value.login) {
    errors.value.login = 'Введите логин'
    return
  }
  
  if (!form.value.password) {
    errors.value.password = 'Введите пароль'
    return
  }
  
  loading.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const success = authStore.login(form.value.login, form.value.password)
    
    if (success) {
      router.push('/')
    } else {
      errors.value.password = 'Неверный логин или пароль'
    }
  } catch (error) {
    errors.value.password = 'Произошла ошибка при входе'
  } finally {
    loading.value = false
  }
}
</script>