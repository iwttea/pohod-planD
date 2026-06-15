export default defineNuxtConfig({
  compatibilityDate: '2026-04-11',
  

  
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
    'animate.css',
    '~/assets/main.css' 
  ],
  
  build: {
    transpile: ['vuetify'],
  },
  
  modules: [
    '@pinia/nuxt',
  ],
  
  
  vite: {
    ssr: {
      noExternal: ['vuetify'], 
    },
  },
  
  app: {
    head: {
      title: 'ПоходПлан',
      meta: [
        { name: 'description', content: 'Планирование походов' }
      ],
      link: [
        //шрифт Comfortaa
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap' }
      ]
    }
  }
})