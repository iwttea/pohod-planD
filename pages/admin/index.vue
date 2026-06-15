<template>
  <div>
    <h1 class="text-h4 mb-4">Админ панель</h1>

    <v-tabs v-model="tab">
      <v-tab value="users">Пользователи</v-tab>
      <v-tab value="trips">Походы</v-tab>
    </v-tabs>

    <v-window v-model="tab">

      <!-- USERS -->
      <v-window-item value="users">
        <v-card class="mt-4 pa-4">

          <v-btn color="primary" class="mb-4" @click="openUserDialog()">
            Добавить пользователя
          </v-btn>

          <v-data-table
            :items="auth.users"
            :headers="userHeaders"
          >
            <template #item.role="{ item }">
              <v-chip>{{ item.role }}</v-chip>
            </template>

            <template #item.actions="{ item }">
              <v-btn icon="mdi-pencil" @click="editUser(item)" />
              <v-btn icon="mdi-delete" color="red" @click="auth.deleteUser(item.id)" />
            </template>
          </v-data-table>

        </v-card>
      </v-window-item>

      <!-- TRIPS -->
      <v-window-item value="trips">
        <v-card class="mt-4 pa-4">

          <v-btn color="primary" class="mb-4" @click="openTripDialog()">
            Добавить поход
          </v-btn>

          <v-data-table
            :items="trips"
            :headers="tripHeaders"
          >
            <template #item.difficulty="{ item }">
              <v-chip>{{ item.difficulty }}</v-chip>
            </template>

            <template #item.actions="{ item }">
              <v-btn icon="mdi-pencil" @click="editTrip(item)" />
              <v-btn icon="mdi-delete" color="red" @click="deleteTrip(item.id)" />
            </template>
          </v-data-table>

        </v-card>
      </v-window-item>

    </v-window>

    <!-- USER DIALOG -->
    <v-dialog v-model="userDialog" max-width="500">
      <v-card class="pa-4">
        <h3>Пользователь</h3>

        <v-text-field v-model="userForm.fio" label="ФИО" />
        <v-text-field v-model="userForm.login" label="Логин" />
        <v-text-field v-model="userForm.password" label="Пароль" />
        <v-text-field v-model="userForm.telephon" label="Телефон" />
        <v-text-field v-model="userForm.email" label="Email" />

        <v-select
          v-model="userForm.role"
          :items="['admin','organizer','user']"
          label="Роль"
        />

        <v-btn color="primary" class="mt-3" @click="saveUser">
          Сохранить
        </v-btn>
      </v-card>
    </v-dialog>

    <!-- TRIP DIALOG -->
    <v-dialog v-model="tripDialog" max-width="500">
      <v-card class="pa-4">
        <h3>Поход</h3>

        <v-text-field v-model="tripForm.title" label="Название" />
        <v-text-field v-model="tripForm.location" label="Локация" />

        <v-select
          v-model="tripForm.difficulty"
          :items="['easy','medium','hard']"
          label="Сложность"
        />

        <v-btn color="primary" class="mt-3" @click="saveTrip">
          Сохранить
        </v-btn>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth.store'

const auth = useAuthStore()
const { trips } = useTrips()

const tab = ref('users')

const userDialog = ref(false)
const tripDialog = ref(false)

const userForm = ref({})
const tripForm = ref({})

const editingUserId = ref(null)
const editingTripId = ref(null)

const userHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'ФИО', key: 'fio' },
  { title: 'Логин', key: 'login' },
  { title: 'Телефон', key: 'telephon' },
  { title: 'Email', key: 'email' },
  { title: 'Роль', key: 'role' },
  { title: 'Действия', key: 'actions' }
]

const tripHeaders = [
  { title: 'Название', key: 'title' },
  { title: 'Локация', key: 'location' },
  { title: 'Сложность', key: 'difficulty' },
  { title: 'Действия', key: 'actions' }
]

/* ================= USERS ================= */

const openUserDialog = () => {
  userForm.value = {
    fio: '',
    login: '',
    password: '',
    telephon: '',
    email: '',
    role: 'user'
  }

  editingUserId.value = null
  userDialog.value = true
}

const editUser = (item) => {
  userForm.value = item
  editingUserId.value = item.id
  userDialog.value = true
}

const saveUser = () => {
  if (editingUserId.value) {
    auth.updateUser(userForm.value)
  } else {
    auth.addUser(userForm.value)
  }

  userDialog.value = false
}

/* ================= TRIPS ================= */

const openTripDialog = () => {
  tripForm.value = {
    title: '',
    location: '',
    difficulty: 'easy'
  }

  editingTripId.value = null
  tripDialog.value = true
}

const editTrip = (item) => {
  tripForm.value = item
  editingTripId.value = item.id
  tripDialog.value = true
}

const saveTrip = () => {
  if (editingTripId.value) {

    // ПРОСТО ЗАМЕНА 
    const index = trips.value.findIndex(t => t.id === editingTripId.value)

    if (index !== -1) {
      trips.value[index] = tripForm.value
    }

  } else {
    trips.value.push({
      id: Date.now(),
      ...tripForm.value
    })
  }

  tripDialog.value = false
}

const deleteTrip = (id) => {
  const index = trips.value.findIndex(t => t.id === id)
  if (index !== -1) trips.value.splice(index, 1)
}
</script>