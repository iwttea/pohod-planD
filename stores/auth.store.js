import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isOrganizer: false
  }),
  
  actions: {
    login(login, password) {
      // МОК-данные для тестирования
      if (login === 'admin') {
        this.user = { 
          id: 1, 
          fio: 'Админ Админов', 
          login: 'admin',
          email: 'admin@mail.ru',
          telephon: '+79991112233',
          userrole_id: 1,
          role_name: 'admin'
        }
        this.isAdmin = true
        this.isOrganizer = true
      } else if (login === 'org') {
        this.user = { 
          id: 2, 
          fio: 'Организатор Организаторов', 
          login: 'org',
          email: 'org@mail.ru',
          telephon: '+79992223344',
          userrole_id: 2,
          role_name: 'organizer'
        }
        this.isOrganizer = true
      } else if (login === 'user') {
        this.user = { 
          id: 3, 
          fio: 'Пользователь Обычный', 
          login: 'user',
          email: 'user@mail.ru',
          telephon: '+79993334455',
          userrole_id: 3,
          role_name: 'user'
        }
      } else {
        return false
      }
      
      this.isAuthenticated = true
      if (import.meta.client) {
        localStorage.setItem('user', JSON.stringify(this.user))
      }
      return true
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.isAdmin = false
      this.isOrganizer = false
      if (import.meta.client) {
        localStorage.removeItem('user')
      }
      navigateTo('/')
    },
    
    checkAuth() {
      if (import.meta.client) {
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          try {
            this.user = JSON.parse(savedUser)
            this.isAuthenticated = true
            this.isAdmin = this.user?.role_name === 'admin'
            this.isOrganizer = this.user?.role_name === 'organizer' || this.user?.role_name === 'admin'
          } catch (e) {
            console.error('Ошибка парсинга пользователя:', e)
          }
        }
      }
    }
  }
})