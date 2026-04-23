<template>
  <div>
    <h1 class="text-h4 mb-6">Создать новый поход</h1>
    <p class="text-subtitle-1 mb-4">Заполните информацию о походе и пригласите участников</p>

    <v-card>
      <v-card-text>
        <v-form ref="tripForm" @submit.prevent="saveTrip">
          <h2 class="text-h6 mb-3">Основная информация</h2>

          <v-text-field
            v-model="form.title"
            label="Название похода"
            placeholder="Например: Поход в горы Кавказа"
            variant="outlined"
            :rules="[v => !!v?.trim() || 'Введите название', v => v?.length >= 3 || 'Минимум 3 символа']"
          />

          <v-textarea
            v-model="form.description"
            label="Описание"
            placeholder="Расскажите о маршруте..."
            variant="outlined"
            rows="3"
            :rules="[v => !!v?.trim() || 'Введите описание', v => v?.length >= 10 || 'Минимум 10 символов']"
          />

          <v-text-field
            v-model="form.location"
            label="Локация"
            placeholder="Например: Кавказ, Россия"
            variant="outlined"
            prepend-inner-icon="mdi-map-marker"
            :rules="[v => !!v?.trim() || 'Введите локацию']"
          />

          <v-select
            v-model="form.difficulty"
            :items="difficulties"
            label="Сложность"
            variant="outlined"
            :rules="[v => !!v || 'Выберите сложность']"
          />

          <h2 class="text-h6 mb-3 mt-4">Даты и участники</h2>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.start_date"
                label="Дата начала"
                type="date"
                variant="outlined"
                :rules="[v => !!v || 'Выберите дату начала']"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="form.end_date"
                label="Дата окончания"
                type="date"
                variant="outlined"
                :rules="[
                  v => !!v || 'Выберите дату окончания',
                  v => !v || !form.start_date || new Date(v) > new Date(form.start_date) || 'Дата окончания должна быть позже начала'
                ]"
              />
            </v-col>
          </v-row>

          <v-text-field
            v-model.number="form.max_participants"
            label="Максимальное количество участников"
            type="number"
            variant="outlined"
            min="1"
            :rules="[v => !!v || 'Введите количество', v => v >= 1 || 'Минимум 1 участник']"
          />

          <v-text-field
            v-model="form.img"
            label="URL изображения"
            placeholder="https://example.com/image.jpg"
            variant="outlined"
            prepend-inner-icon="mdi-image"
            :rules="[
              v => {
                if (!v) return true
                try { new URL(v); return true } catch { return 'Некорректный URL' }
              }
            ]"
            hint="Оставьте пустым для изображения по умолчанию"
            persistent-hint
          />

          <div class="d-flex gap-2 mt-4">
            <v-btn type="submit" color="success" size="large" :loading="loading">
              Сохранить поход
            </v-btn>
            <v-btn variant="outlined" size="large" @click="$router.push('/')">
              Отменить
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'organizer' })

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

const difficulties = [
  { title: 'Легкий', value: 'easy' },
  { title: 'Средний - Требует подготовки', value: 'medium' },
  { title: 'Сложный', value: 'hard' }
]

const saveTrip = async () => {
  const { valid } = await tripForm.value.validate()
  if (!valid) return

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
.gap-2 { gap: 8px; }
</style>