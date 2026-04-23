<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">

        <v-card>

          <v-card-title class="text-center">
            Регистрация
          </v-card-title>

          <v-card-text>

            <v-form @submit.prevent="register">

              <v-text-field
                v-model="form.fio"
                label="ФИО"
                :error-messages="errors.fio"
              ></v-text-field>

              <v-text-field
                v-model="form.login"
                label="Логин"
                :error-messages="errors.login"
              ></v-text-field>

              <v-text-field
                v-model="form.email"
                label="Email"
                :error-messages="errors.email"
              ></v-text-field>

              <v-text-field
                v-model="form.password"
                label="Пароль"
                type="password"
                :error-messages="errors.password"
              ></v-text-field>

              <v-text-field
                v-model="form.password2"
                label="Повторите пароль"
                type="password"
                :error-messages="errors.password2"
              ></v-text-field>

              <v-btn
                type="submit"
                color="green"
                block
                class="mt-3"
              >
                Зарегистрироваться
              </v-btn>

            </v-form>

            <div class="text-center mt-3">
              <v-btn to="/login" variant="text">
                Уже есть аккаунт?
              </v-btn>
            </div>

          </v-card-text>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
  fio: '',
  login: '',
  email: '',
  password: '',
  password2: ''
})

const errors = ref({})

function validate() {
  errors.value = {}

  if (!form.value.fio) {
    errors.value.fio = 'Введите ФИО'
  }

  if (!form.value.login) {
    errors.value.login = 'Введите логин'
  }

  if (!form.value.email) {
    errors.value.email = 'Введите email'
  } else if (!form.value.email.includes('@')) {
    errors.value.email = 'Email должен содержать @'
  }

  if (!form.value.password) {
    errors.value.password = 'Введите пароль'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Минимум 6 символов'
  }

  if (form.value.password !== form.value.password2) {
    errors.value.password2 = 'Пароли не совпадают'
  }

  return Object.keys(errors.value).length === 0
}

function register() {
  if (!validate()) return

  console.log('user:', form.value)

  router.push('/login')
}
</script>