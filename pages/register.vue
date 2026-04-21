<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="5">
        <v-card class="mx-auto" elevation="8">
          <v-card-title class="text-h5 text-center py-4">
            Регистрация
          </v-card-title>
          
          <v-card-text>
            <v-form @submit.prevent="doRegister">
              <v-text-field
                v-model="form.fio"
                label="ФИО"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                :error-messages="errors.fio"
                placeholder="Иванов Иван Иванович"
              ></v-text-field>
              
              <v-text-field
                v-model="form.login"
                label="Логин"
                prepend-inner-icon="mdi-account-circle"
                variant="outlined"
                :error-messages="errors.login"
                placeholder="user123"
              ></v-text-field>
              
              <v-text-field
                v-model="form.email"
                label="Email"
                type="email"
                prepend-inner-icon="mdi-email"
                variant="outlined"
                :error-messages="errors.email"
                placeholder="user@example.com"
              ></v-text-field>
              
              <v-text-field
                v-model="form.password"
                label="Пароль"
                type="password"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
                :error-messages="errors.password"
                hint="Минимум 6 символов"
                persistent-hint
              ></v-text-field>
              
              <v-text-field
                v-model="form.passwordConfirm"
                label="Подтвердите пароль"
                type="password"
                prepend-inner-icon="mdi-lock-check"
                variant="outlined"
                :error-messages="errors.passwordConfirm"
              ></v-text-field>
              
              <v-text-field
                v-model="form.phone"
                label="Телефон"
                type="tel"
                prepend-inner-icon="mdi-phone"
                variant="outlined"
                placeholder="+7 (999) 123-45-67"
              ></v-text-field>
              
              <v-btn
                type="submit"
                color="success"
                block
                size="large"
                :loading="loading"
                class="mt-4"
              >
                Зарегистрироваться
              </v-btn>
            </v-form>
            
            <div class="text-center mt-4">
              <span class="text-grey">Уже есть аккаунт?</span>
              <v-btn
                variant="text"
                color="success"
                to="/login"
              >
                Войти
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

const router = useRouter()
const loading = ref(false)

const form = ref({
  fio: '',
  login: '',
  email: '',
  password: '',
  passwordConfirm: '',
  phone: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  
  if (!form.value.fio?.trim()) {
    errors.value.fio = 'Введите ФИО'
  } else if (form.value.fio.length < 3) {
    errors.value.fio = 'ФИО должно быть не менее 3 символов'
  }
  
  if (!form.value.login?.trim()) {
    errors.value.login = 'Введите логин'
  } else if (form.value.login.length < 3) {
    errors.value.login = 'Логин должен быть не менее 3 символов'
  }
  
  if (!form.value.email?.trim()) {
    errors.value.email = 'Введите email'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Введите корректный email'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Введите пароль'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Пароль должен быть не менее 6 символов'
  }
  
  if (form.value.password !== form.value.passwordConfirm) {
    errors.value.passwordConfirm = 'Пароли не совпадают'
  }
  
  return Object.keys(errors.value).length === 0
}

const doRegister = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  try {
    const userData = {
      ...form.value,
      role: 'user'
    }
    
    console.log('Регистрация:', userData)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    alert('Регистрация успешна! Теперь вы можете войти в систему.')
    router.push('/login')
  } catch (error) {
    alert('Произошла ошибка при регистрации')
  } finally {
    loading.value = false
  }
}
</script>