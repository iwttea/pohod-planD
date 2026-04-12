<template>
  <div>
    <h1 class="text-h3 mb-6">Мои Походы</h1>
    <p class="text-subtitle-1 mb-4">
      Походы, которые вы организуете или в которых участвуете
    </p>

    <h2 class="text-h5 mb-3">Организую ({{ organizedTrips.length }})</h2>
    <v-row v-if="organizedTrips.length > 0">
      <v-col 
        v-for="trip in organizedTrips" 
        :key="trip.id"
        cols="12" 
        sm="6" 
        md="4"
      >
        <TripCard :trip="trip" />
      </v-col>
    </v-row>
    <v-alert v-else type="info" class="mb-6">
      Вы пока не организуете ни одного похода
    </v-alert>

    <h2 class="text-h5 mb-3 mt-6">Участвую ({{ participatingTrips.length }})</h2>
    <v-row v-if="participatingTrips.length > 0">
      <v-col 
        v-for="trip in participatingTrips" 
        :key="trip.id"
        cols="12" 
        sm="6" 
        md="4"
      >
        <TripCard :trip="trip" />
      </v-col>
    </v-row>
    <v-alert v-else type="info">
      Вы пока не участвуете ни в одном походе
    </v-alert>
  </div>
</template>

<script setup>
import TripCard from '~/components/Trip/TripCard.vue'

const authStore = useAuthStore()
const { trips } = useTrips()

const organizedTrips = computed(() => {
  if (!authStore.user) return []
  
  return trips.value.filter(t => t.id === 1) 
})

const participatingTrips = computed(() => {
  if (!authStore.user) return []
  
  return trips.value.filter(t => t.id === 4) 
})
</script>