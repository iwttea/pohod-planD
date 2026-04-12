<template>
  <div>
    <h1 class="text-h4 mb-6">Создать новый поход</h1>
    
    <p class="text-subtitle-1 mb-4">
      Заполните информацию о походе и пригласите участников
    </p>

    <v-card>
      <v-card-text>
        <v-form @submit.prevent="saveTrip">
        
          <h2 class="text-h6 mb-3">Основная информация</h2>
          
          <v-text-field
            v-model="form.title"
            label="Название похода"
            placeholder="Например: Поход в горы Кавказа"
            variant="outlined"
            required
          ></v-text-field>

          <v-textarea
            v-model="form.description"
            label="Описание"
            placeholder="Расскажите о маршруте, целях похода и что ждёт участников..."
            variant="outlined"
            rows="3"
          ></v-textarea>

          <v-text-field
            v-model="form.location"
            label="Локация"
            placeholder="Например: Кавказ, Россия"
            variant="outlined"
            prepend-inner-icon="mdi-map-marker"
          ></v-text-field>

          <v-select
            v-model="form.difficulty"
            :items="difficulties"
            label="Сложность"
            variant="outlined"
            required
          ></v-select>

          <h2 class="text-h6 mb-3 mt-4">Даты и участники</h2>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.start_date"
                label="Дата начала"
                type="date"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.end_date"
                label="Дата окончания"
                type="date"
                variant="outlined"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model.number="form.max_participants"
            label="Максимальное количество участников"
            type="number"
            variant="outlined"
            min="1"
            required
          ></v-text-field>

          <v-text-field
            v-model="form.img"
            label="URL изображения"
            placeholder="https://example.com/image.jpg"
            variant="outlined"
            prepend-inner-icon="mdi-image"
          ></v-text-field>

          <div class="d-flex gap-2 mt-4">
            <v-btn 
              type="submit" 
              color="success" 
              size="large"
              :loading="loading"
            >
              Сохранить поход
            </v-btn>
            <v-btn 
              variant="outlined" 
              size="large"
              @click="$router.push('/')"
            >
              Отменить
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: 'organizer'
})

const router = useRouter()
const loading = ref(false)

const form = ref({
  title: '',
  description: '',
  location: '',
  difficulty: 'medium',
  start_date: '',
  end_date: '',
  max_participants: 10,
  img: ''
})

const difficulties = [
  { title: 'Легкий', value: 'easy' },
  { title: 'Средний - Требует подготовки', value: 'medium' },
  { title: 'Сложный', value: 'hard' }
]

const saveTrip = async () => {
  loading.value = true
  
  try {
    
    console.log('Создаем поход:', form.value)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    alert('Поход успешно создан!')
    
    router.push('/')
  } catch (error) {
    console.error('Ошибка при создании похода:', error)
    alert('Произошла ошибка при создании похода')
  } finally {
    loading.value = false
  }
}
</script>