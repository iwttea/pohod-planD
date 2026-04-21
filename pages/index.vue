<template>
  <div>
    <h1 class="text-h3 text-center mb-2">Найди свой идеальный поход</h1>
    <p class="text-center text-h6 text-grey mb-6">
      Присоединяйся к походам или организуй собственное приключение
    </p>

    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Поиск по названию или локации"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-select
          v-model="selectedDifficulty"
          :items="difficultyOptions"
          label="Все уровни"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
        ></v-select>
      </v-col>
      <v-col cols="6" md="3">
        <v-select
          v-model="selectedStatus"
          :items="statusOptions"
          label="Все статусы"
          variant="outlined"
          density="comfortable"
          hide-details
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <p class="text-subtitle-1 mb-4">
      Найдено походов: {{ filteredTrips.length }}
    </p>

    <v-row>
      <v-col 
        v-for="trip in filteredTrips" 
        :key="trip.id"
        cols="12" 
        sm="6" 
        md="4"
      >
        <TripCard :trip="trip" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import TripCard from '~/components/trip/TripCard.vue'

const { trips } = useTrips()

const searchQuery = ref('')
const selectedDifficulty = ref(null)
const selectedStatus = ref(null)

const difficultyOptions = [
  { title: 'Легкий', value: 'easy' },
  { title: 'Средний', value: 'medium' },
  { title: 'Сложный', value: 'hard' }
]

const statusOptions = [
  { title: 'Запланирован', value: 'planned' },
  { title: 'Активный', value: 'active' },
  { title: 'Завершен', value: 'completed' }
]

const filteredTrips = computed(() => {
  return trips.value.filter(trip => {
    //по поиску
    const matchesSearch = !searchQuery.value || 
      trip.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    //по сложности
    const matchesDifficulty = !selectedDifficulty.value || 
      trip.difficulty === selectedDifficulty.value
    
    //по статусу
    const matchesStatus = !selectedStatus.value || 
      trip.status === selectedStatus.value
    
    return matchesSearch && matchesDifficulty && matchesStatus
  })
})
</script>