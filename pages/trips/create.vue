<template>
  <div>
    <h1 class="text-h4 mb-6">Создать новый поход</h1>
    
    <p class="text-subtitle-1 mb-4">
      Заполните информацию о походе и пригласите участников
    </p>

    <v-card>
      <v-card-text>
        <v-form ref="tripForm" @submit.prevent="saveTrip">
        
          <h2 class="text-h6 mb-3">Основная информация</h2>
          
          <v-text-field
            v-model="form.title"
            label="Название похода"
            placeholder="Например: Поход в горы Кавказа"
            variant="outlined"
            :rules="[required, minLength(3)]"
            :error-messages="errors.title"
            @input="errors.title = ''"
          ></v-text-field>

          <v-textarea
            v-model="form.description"
            label="Описание"
            placeholder="Расскажите о маршруте, целях похода и что ждёт участников..."
            variant="outlined"
            rows="3"
            :rules="[required, minLength(10)]"
            :error-messages="errors.description"
            @input="errors.description = ''"
          ></v-textarea>

          <v-text-field
            v-model="form.location"
            label="Локация"
            placeholder="Например: Кавказ, Россия"
            variant="outlined"
            prepend-inner-icon="mdi-map-marker"
            :rules="[required]"
            :error-messages="errors.location"
            @input="errors.location = ''"
          ></v-text-field>

          <v-select
            v-model="form.difficulty"
            :items="difficulties"
            label="Сложность"
            variant="outlined"
            :rules="[required]"
            :error-messages="errors.difficulty"
            @update:model-value="errors.difficulty = ''"
          ></v-select>

          <h2 class="text-h6 mb-3 mt-4">Даты и участники</h2>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.start_date"
                label="Дата начала"
                type="date"
                variant="outlined"
                :rules="[required]"
                :error-messages="errors.start_date"
                @input="errors.start_date = ''"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.end_date"
                label="Дата окончания"
                type="date"
                variant="outlined"
                :rules="[required, endDateAfterStart]"
                :error-messages="errors.end_date"
                @input="errors.end_date = ''"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-text-field
            v-model.number="form.max_participants"
            label="Максимальное количество участников"
            type="number"
            variant="outlined"
            min="1"
            :rules="[required, minParticipants]"
            :error-messages="errors.max_participants"
            @input="errors.max_participants = ''"
          ></v-text-field>

          <v-text-field
            v-model="form.img"
            label="URL изображения"
            placeholder="https://example.com/image.jpg"
            variant="outlined"
            prepend-inner-icon="mdi-image"
            :rules="[urlRule]"
            :error-messages="errors.img"
            @input="errors.img = ''"
            hint="Оставьте пустым для изображения по умолчанию"
            persistent-hint
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
const tripForm = ref(null)
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

const errors = ref({
  title: '',
  description: '',
  location: '',
  difficulty: '',
  start_date: '',
  end_date: '',
  max_participants: '',
  img: ''
})

const difficulties = [
  { title: 'Легкий', value: 'easy' },
  { title: 'Средний - Требует подготовки', value: 'medium' },
  { title: 'Сложный', value: 'hard' }
]

// Правила валидации
const required = (value) => {
  if (value && value.toString().trim() !== '') return true
  return 'Это поле обязательно для заполнения'
}

const minLength = (min) => (value) => {
  if (!value || value.length >= min) return true
  return `Минимальная длина ${min} символов`
}

const minParticipants = (value) => {
  if (!value || value >= 1) return true
  return 'Минимальное количество участников: 1'
}

const urlRule = (value) => {
  if (!value) return true
  try {
    new URL(value)
    return true
  } catch {
    return 'Введите корректный URL'
  }
}

const endDateAfterStart = (value) => {
  if (!value || !form.value.start_date) return true
  if (new Date(value) > new Date(form.value.start_date)) return true
  return 'Дата окончания должна быть позже даты начала'
}

// Валидация формы
const validateForm = () => {
  let isValid = true
  errors.value = {
    title: '',
    description: '',
    location: '',
    difficulty: '',
    start_date: '',
    end_date: '',
    max_participants: '',
    img: ''
  }
  
  // Проверка названия
  if (!form.value.title || form.value.title.trim() === '') {
    errors.value.title = 'Введите название похода'
    isValid = false
  } else if (form.value.title.length < 3) {
    errors.value.title = 'Название должно быть не менее 3 символов'
    isValid = false
  }
  
  // Проверка описания
  if (!form.value.description || form.value.description.trim() === '') {
    errors.value.description = 'Введите описание похода'
    isValid = false
  } else if (form.value.description.length < 10) {
    errors.value.description = 'Описание должно быть не менее 10 символов'
    isValid = false
  }
  
  // Проверка локации
  if (!form.value.location || form.value.location.trim() === '') {
    errors.value.location = 'Введите локацию'
    isValid = false
  }
  
  // Проверка сложности
  if (!form.value.difficulty) {
    errors.value.difficulty = 'Выберите сложность похода'
    isValid = false
  }
  
  // Проверка даты начала
  if (!form.value.start_date) {
    errors.value.start_date = 'Выберите дату начала'
    isValid = false
  }
  
  // Проверка даты окончания
  if (!form.value.end_date) {
    errors.value.end_date = 'Выберите дату окончания'
    isValid = false
  } else if (form.value.start_date && new Date(form.value.end_date) <= new Date(form.value.start_date)) {
    errors.value.end_date = 'Дата окончания должна быть позже даты начала'
    isValid = false
  }
  
  // Проверка количества участников
  if (!form.value.max_participants || form.value.max_participants < 1) {
    errors.value.max_participants = 'Введите количество участников (минимум 1)'
    isValid = false
  }
  
  // Проверка URL изображения (если заполнено)
  if (form.value.img) {
    try {
      new URL(form.value.img)
    } catch {
      errors.value.img = 'Введите корректный URL изображения'
      isValid = false
    }
  }
  
  return isValid
}

const saveTrip = async () => {
  // Валидация перед отправкой
  if (!validateForm()) {
    return
  }
  
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

<style scoped>
.gap-2 {
  gap: 8px;
}
</style>