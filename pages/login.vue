<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">

        <v-card>

          <v-card-title class="text-center">
            Вход
          </v-card-title>

          <v-card-text>

            <v-alert class="mb-4" color="success" variant="tonal">
              admin / org / user<br>
              пароль любой
            </v-alert>

            <v-form @submit.prevent="doLogin">

              <v-text-field
                v-model="form.login"
                label="Логин"
                :error-messages="errors.login"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Пароль"
                type="password"
                :error-messages="errors.password"
              ></v-text-field>

              <v-btn
                type="submit"
                color="success"
                block
                class="mt-3"
                :loading="loading"
              >
                Войти
              </v-btn>

            </v-form>

          </v-card-text>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

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

  // простая проверка
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

    await new Promise(r => setTimeout(r, 300))

    const success = authStore.login(
      form.value.login,
      form.value.password
    )

    if (success) {

      // ВАЖНО: всегда ведём на безопасную страницу
      router.push('/')

    } else {
      errors.value.password = 'Неверный логин или пароль'
    }

  } catch (e) {
    errors.value.password = 'Ошибка входа'
  }

  loading.value = false
}
</script>