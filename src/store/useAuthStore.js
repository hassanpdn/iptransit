import { defineStore } from 'pinia'
import { login, logout, register } from '@/api/auth'
import { useSnackbarStore } from './useSnackbarStore'
import router from '@/router'

// Store for handling user authentication
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuthenticated: false,
    token: null,
    user: null,
  }),
  getters: {
    isLoggedIn(state) {
      return state.isAuthenticated
    },
  },
  actions: {
    showMessages({ text, color }) {

      const snackbarStore = useSnackbarStore()

      snackbarStore.open({ text, color })
    },
    handleErrors(arr) {

      let errors = [], flattenErrors = []

      Object.values(arr).forEach(err => {
        errors.push(err)
      })

      flattenErrors = [].concat.apply([], errors)

      flattenErrors.forEach(err => {
        this.showMessages({ text: err, color: 'error' })
      })
    },
    async login(username, password) {
      try {
        const response = await login(username, password)
        if (response.status === 200) {
          const { token, user } = response.data.data

          this.token = token
          this.user = user
          this.isAuthenticated = true
          router.push({ name: 'index' })

        }

        return response
      } catch (error) {
        return error
      }
    },
    async register(data) {
      try {
        const response = await register(data)
        return response
      } catch (error) {
        console.log(error)
      }
    },
    async logout() {
      try {
        // await logout()

        this.isAuthenticated = false
        this.token = null
        this.user = null

        router.push({ name: 'login' })
      } catch (error) {
        console.log(error)
      }
    },
    redirectToLogin() {
      this.isAuthenticated = false
      this.token = null
      this.user = null
      router.push({ name: 'login' })
    }
  },
  persist: true,
})
