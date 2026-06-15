import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    isOrganizer: false,

    // MOCK USERS (единый источник данных)
    users: [
      {
        id: 1,
        fio: 'Админ Админов',
        login: 'admin',
        password: '123',
        email: 'admin@mail.ru',
        telephon: '+79991112233',
        role: 'admin'
      },
      {
        id: 2,
        fio: 'Организатор Организаторов',
        login: 'org',
        password: '123',
        email: 'org@mail.ru',
        telephon: '+79992223344',
        role: 'organizer'
      },
      {
        id: 3,
        fio: 'Пользователь Обычный',
        login: 'user',
        password: '123',
        email: 'user@mail.ru',
        telephon: '+79993334455',
        role: 'user'
      }
    ]
  }),

  actions: {
    login(login, password) {
      const foundUser = this.users.find(
        u => u.login === login && u.password === password
      )

      if (!foundUser) return false

      this.user = foundUser
      this.isAuthenticated = true

      this.isAdmin = foundUser.role === 'admin'
      this.isOrganizer =
        foundUser.role === 'organizer' || foundUser.role === 'admin'

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
        const saved = localStorage.getItem('user')

        if (saved) {
          this.user = JSON.parse(saved)

          this.isAuthenticated = true
          this.isAdmin = this.user.role === 'admin'
          this.isOrganizer =
            this.user.role === 'organizer' || this.user.role === 'admin'
        }
      }
    },

    // ===== ADMIN CRUD USERS =====

    addUser(user) {
      user.id = Date.now()
      this.users.push(user)
    },

    updateUser(updated) {
      const index = this.users.findIndex(u => u.id === updated.id)
      if (index !== -1) {
        this.users[index] = updated
      }
    },

    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id)
    }
  }
})