<template>
  <div>
    <h1 class="text-h3 text-center mb-2 animate__animated animate__fadeInDown animate__slow">Найди свой идеальный поход</h1>
    <p class="text-center text-h6 text-grey mb-6 animate__animated animate__fadeIn">
      Присоединяйся к походам или организуй собственное приключение
    </p>

  <v-row class="mb-6">
    <v-col cols="12" md="4">
      <v-text-field
        v-model="searchQuery"
        label="Поиск похода"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="comfortable"
        clearable
        hide-details
      />
    </v-col>

    <v-col cols="6" md="2">
      <v-select
        v-model="selectedDifficulty"
        :items="difficultyOptions"
        label="Сложность"
        variant="outlined"
        density="comfortable"
        clearable
        hide-details
      />
    </v-col>

    <v-col cols="6" md="2">
      <v-select
        v-model="selectedStatus"
        :items="statusOptions"
        label="Статус"
        variant="outlined"
        density="comfortable"
        clearable
        hide-details
      />
    </v-col>

    <v-col cols="6" md="2">
      <v-select
        v-model="sortBy"
        :items="sortOptions"
        label="Сортировка"
        variant="outlined"
        density="comfortable"
        hide-details
      />
    </v-col>

    <v-col cols="6" md="2">
      <v-btn
        block
        height="48"
        color="primary"
        variant="outlined"
        @click="resetFilters"
      >
        Сбросить
      </v-btn>
    </v-col>
  </v-row>

    <p class="text-subtitle-1 mb-4">
      Найдено походов: {{ filteredTrips.length }}
    </p>

    <v-row>
      <v-col
        v-for="(trip, i) in filteredTrips"
        :key="trip.id"
        cols="12"
        sm="6"
        md="4"
        class="animate__animated animate__fadeInUp"
        :style="{ animationDelay: i * 0.07 + 's' }"
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
const sortBy = ref('date')



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

const sortOptions = [ 
  { title: 'По дате', value: 'date' }, 
  { title: 'По названию', value: 'title' } 
]

const filteredTrips = computed(() => {
  let result = trips.value.filter(trip => {
    const matchesSearch =
      !searchQuery.value ||
      trip.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesDifficulty =
      !selectedDifficulty.value ||
      trip.difficulty === selectedDifficulty.value

    const matchesStatus =
      !selectedStatus.value ||
      trip.status === selectedStatus.value

    return matchesSearch && matchesDifficulty && matchesStatus
  })

  // сортировка
  if (sortBy.value === 'title') {
    result.sort((a, b) => a.title.localeCompare(b.title))
  }

  if (sortBy.value === 'date') {
    result.sort(
      (a, b) => new Date(a.start_date) - new Date(b.start_date)
    )
  }

  return result
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedDifficulty.value = null
  selectedStatus.value = null
  sortBy.value = 'date'
}

</script>