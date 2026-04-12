<template>
  <div v-if="trip">
    <h1 class="text-h3 mb-4">{{ trip.title }}</h1>
    
    <v-img 
      :src="trip.img || 'https://placehold.co/1200x400/1976D2/white'"
      height="400"
      cover
      class="mb-6 rounded-lg"
    ></v-img>

    <v-row>
      
      <v-col cols="12" md="8">
        <v-card>
        
          <v-tabs 
            v-model="activeTab" 
            color="#4CAF50" 
            slider-color="#4CAF50"
          >
            <v-tab value="overview">Обзор</v-tab>
            <v-tab value="participants">Участники</v-tab>
            <v-tab value="gear">Снаряжение</v-tab>
            <v-tab value="route">Маршрут</v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="pa-4">
           

            <v-window-item value="overview">
              <h3 class="text-h6 mb-3">Описание</h3>
              <p class="text-body-1">{{ trip.description }}</p>
              
              <h3 class="text-h6 mt-4 mb-2">Дополнительная информация</h3>
              <ul>
                <li>Требуется базовая физическая подготовка</li>
                <li>Рекомендуется опыт походов (для сложности средний)</li>
                <li>Возрастное ограничение: 16+</li>
                <li>Страховка обязательна</li>
              </ul>
            </v-window-item>

            

            <v-window-item value="participants">
              <h3 class="text-h6 mb-3">Список участников</h3>
              <v-list>
                <v-list-item 
                  v-for="(participant, index) in mockParticipants" 
                  :key="index"
                >
                  <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                  </template>
                  <v-list-item-title>{{ participant.name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ participant.role }}</v-list-item-subtitle>
                  <template v-slot:append>
                    <v-chip 
                      :color="participant.status === 'confirmed' ? 'green' : 'orange'"
                      size="small"
                    >
                      {{ participant.status === 'confirmed' ? 'Подтвержден' : 'Ожидает' }}
                    </v-chip>
                  </template>
                </v-list-item>
              </v-list>
            </v-window-item>



            <v-window-item value="gear">
              <h3 class="text-h6 mb-3">Необходимое снаряжение</h3>
              <v-list>
                <v-list-item v-for="item in gearList" :key="item">
                  <template v-slot:prepend>
                    
                    <v-icon color="#4CAF50">mdi-check-circle</v-icon>
                  </template>
                  {{ item }}
                </v-list-item>
              </v-list>
            </v-window-item>

            
            <v-window-item value="route">
              <h3 class="text-h6 mb-3">План маршрута</h3>
              <v-timeline density="compact">
                <v-timeline-item
                  v-for="(point, index) in routePoints"
                  :key="index"
                  :dot-color="index === 0 ? 'green' : '#4CAF50'"
                  size="small"
                >
                  <strong>{{ point.day }}</strong>
                  <div>{{ point.description }}</div>
                </v-timeline-item>
              </v-timeline>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          
          <v-card-title class="bg-success text-white">Детали похода</v-card-title>

          <v-list>
            <v-list-item prepend-icon="mdi-map-marker">
              <v-list-item-title>Локация</v-list-item-title>
              <v-list-item-subtitle>{{ trip.location }}</v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item prepend-icon="mdi-calendar">
              <v-list-item-title>Даты</v-list-item-title>
              <v-list-item-subtitle>
                {{ formatFullDate(trip.start_date) }} - {{ formatFullDate(trip.end_date) }}
              </v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item prepend-icon="mdi-account-group">
              <v-list-item-title>Участники</v-list-item-title>
              <v-list-item-subtitle>
                {{ trip.participants?.length || 0 }} / {{ trip.max_participants }}
              </v-list-item-subtitle>
            </v-list-item>
            
            <v-list-item prepend-icon="mdi-signal">
              <v-list-item-title>Сложность</v-list-item-title>
              <v-list-item-subtitle>
                <v-chip :color="difficultyColor" size="small" text-color="white">
                  {{ difficultyText }}
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
          
          <v-divider></v-divider>
          
          <v-card-text>
            <h3 class="text-subtitle-1 font-weight-bold">Организатор:</h3>
            <div class="d-flex align-center mt-2">
              <v-icon>mdi-account</v-icon>
              <span class="ml-2">{{ trip.organizer?.fio }}</span>
            </div>
          </v-card-text>
          
          <v-card-actions>
            <v-btn 
              block 
              color="success" 
              size="large"
              @click="joinTrip"
              :loading="joining"
            >
              Присоединиться
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
  
  <div v-else class="text-center py-12">
    
    <v-progress-circular indeterminate color="success"></v-progress-circular>
    <p class="mt-4">Загрузка похода...</p>
  </div>
</template>

<script setup>
const route = useRoute()
const tripId = route.params.id

const activeTab = ref('overview')
const joining = ref(false)

const { getTripById } = useTrips()
const trip = ref(null)

// Мок-данные для демонстрации
const mockParticipants = [
  { name: 'Александр Иванов', role: 'Организатор', status: 'confirmed' },
  { name: 'Мария Петрова', role: 'Участник', status: 'confirmed' },
  { name: 'Дмитрий Сидоров', role: 'Участник', status: 'confirmed' },
  { name: 'Анна Козлова', role: 'Участник', status: 'pending' },
  { name: 'Сергей Морозов', role: 'Участник', status: 'pending' }
]

const gearList = [
  'Треккинговые ботинки',
  'Рюкзак 40-60 литров',
  'Спальный мешок (температура комфорта -5°C)',
  'Коврик (каремат)',
  'Треккинговые палки',
  'Налобный фонарь + запасные батарейки',
  'Термос / фляга для воды',
  'Дождевик',
  'Теплая одежда (флиска, термобелье)',
  'Аптечка личная',
  'Солнцезащитные очки и крем',
  'Документы в гермоупаковке'
]

const routePoints = [
  { day: 'День 1: Старт', description: 'Сбор группы в 8:00, выезд из города. Прибытие к началу маршрута в 11:00. Переход до первого лагеря (8 км).' },
  { day: 'День 2: Основной', description: 'Подъем на перевал (2500 м). Обед на вершине. Спуск к горному озеру. Ночевка у озера.' },
  { day: 'День 3: Финиш', description: 'Радиальный выход к водопаду. Возвращение в лагерь. Сборы и выход к транспорту. Возвращение в город к 20:00.' }
]

const difficultyColor = computed(() => {
  if (!trip.value) return 'grey'
  switch(trip.value.difficulty) {
    case 'easy': return 'green'
    case 'medium': return 'orange'
    case 'hard': return 'red'
    default: return 'grey'
  }
})

const difficultyText = computed(() => {
  if (!trip.value) return ''
  switch(trip.value.difficulty) {
    case 'easy': return 'Легкий'
    case 'medium': return 'Средний'
    case 'hard': return 'Сложный'
    default: return ''
  }
})

const formatFullDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
}

const joinTrip = async () => {
  joining.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    alert('Вы успешно присоединились к походу!')
  } catch (error) {
    alert('Ошибка при присоединении к походу')
  } finally {
    joining.value = false
  }
}

onMounted(() => {
  trip.value = getTripById(parseInt(tripId))
})
</script>