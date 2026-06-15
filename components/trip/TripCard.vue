<template>
  <v-card
    class="trip-card mx-auto h-100 d-flex flex-column animate__animated animate__fadeIn" hover @click="$router.push(`/trips/${trip.id}`)">
    <v-img :src="trip.img || 'https://placehold.co/600x400/EEE/31343C'" height="200" cover>
      <v-chip 
        class="ma-2" 
        :color="difficultyColor" 
        text-color="white" 
        size="small"
      >
        {{ difficultyText }}
      </v-chip>
    </v-img>
    
    <v-card-title class="text-h6">{{ trip.title }}</v-card-title>
    
    <v-card-text class="flex-grow-1">
      <div class="text-body-2 text-truncate mb-2">{{ trip.description }}</div>
      
      <div class="d-flex align-center text-body-2 mb-1">
        <v-icon size="small" class="mr-1" color="#4CAF50">mdi-map-marker</v-icon> 
        {{ trip.location }}
      </div>
      
      <div class="d-flex align-center text-body-2 mb-1">
        <v-icon size="small" class="mr-1" color="#4CAF50">mdi-calendar</v-icon>  
        {{ formatDate(trip.start_date) }} - {{ formatDate(trip.end_date) }}
      </div>
      
      <div class="d-flex align-center text-body-2">
        <v-icon size="small" class="mr-1" color="#4CAF50">mdi-account-group</v-icon>  
        {{ trip.participants?.length || 0 }}/{{ trip.max_participants }} участников
      </div>
    </v-card-text>
    
    <v-divider></v-divider>
    
    <v-card-actions>
      <v-icon size="small" class="mr-1">mdi-account</v-icon> 
      <span class="text-body-2">Организатор: {{ trip.organizer?.fio || 'Неизвестно' }}</span>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({ 
  trip: { 
    type: Object, 
    required: true 
  } 
})

const difficultyColor = computed(() => {
  switch(props.trip.difficulty) {
    case 'easy': return 'green'
    case 'medium': return 'orange'
    case 'hard': return 'red'
    default: return 'grey'
  }
})

const difficultyText = computed(() => {
  switch(props.trip.difficulty) {
    case 'easy': return 'Легкий'
    case 'medium': return 'Средний'
    case 'hard': return 'Сложный'
    default: return ''
  }
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}
</script>

<style>
.trip-card {
  transition: all 0.25s ease;
}

.trip-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.2);
}
</style>