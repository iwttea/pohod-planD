
<template>
  <div>
    <h1 class="text-h3 mb-6">Профиль пользователя</h1>
    
    <v-card max-width="600" class="mx-auto">
      <v-card-title class="bg-success text-white">
        <v-icon left class="mr-2">mdi-account</v-icon>
        Личная информация
      </v-card-title>
      
      <v-card-text class="pt-4">
        <v-list>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-account</v-icon>
            </template>
            <v-list-item-title>ФИО</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user?.fio || 'Не указано' }}</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-email</v-icon>
            </template>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user?.email || 'Не указано' }}</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-phone</v-icon>
            </template>
            <v-list-item-title>Телефон</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user?.telephon || 'Не указано' }}</v-list-item-subtitle>
          </v-list-item>
          
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-shield-account</v-icon>
            </template>
            <v-list-item-title>Роль</v-list-item-title>
            <v-list-item-subtitle>
              <v-chip :color="roleColor" size="small">
                {{ roleText }}
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      
      <v-card-actions>
        <v-btn color="primary" block @click="editProfile">
          Редактировать профиль
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
const authStore = useAuthStore()

const roleColor = computed(() => {
  if (authStore.isAdmin) return 'red'
  if (authStore.isOrganizer) return 'green'
  return 'blue'
})

const roleText = computed(() => {
  if (authStore.isAdmin) return 'Администратор'
  if (authStore.isOrganizer) return 'Организатор'
  return 'Пользователь'
})

const editProfile = () => {
  alert('Функция редактирования профиля в разработке')
}
</script>