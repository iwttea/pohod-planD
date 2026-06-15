import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components,
    directives,

    theme: {
      defaultTheme: 'light',

      themes: {
        light: {
          dark: false,
          colors: {
            background: '#F5F5F5',
            surface: '#FFFFFF',
            primary: '#1976D2',
            secondary: '#424242',
            success: '#2E7D32',
            error: '#C62828'
          }
        },

        dark: {
          dark: true,
          colors: {
            background: '#121212',
            surface: '#1E1E1E',
            primary: '#90CAF9',
            secondary: '#B0BEC5',
            success: '#66BB6A',
            error: '#EF5350'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})