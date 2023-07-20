import { useAuthStore } from '@/store/useAuthStore'
import { useLoadingStore } from '@/store/useLoadingStore'
import { useSnackbarStore } from '@/store/useSnackbarStore'
import axios from 'axios'
import router from '@/router'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
})

let handleLoading = true;

api.interceptors.request.use(
  config => {
    const authStore = useAuthStore(), loadingStore = useLoadingStore()
    handleLoading = config.handleLoading ?? true
    if (handleLoading) loadingStore.isLoading = true
    loadingStore.isInlineLoading = true
    let token = authStore.token
    token && (config.headers['Authorization'] = 'Bearer ' + token)
    return config
  },
  error => {
    console.log(error)

    return Promise.reject()
  },
)

api.interceptors.response.use(
  response => {
    const loadingStore = useLoadingStore(), snackbarStore = useSnackbarStore();

    handleLoading = true
    loadingStore.isLoading = false
    loadingStore.isInlineLoading = false
    if (!navigator.onLine) {
      snackbarStore.open({ text: 'There was a network error. Please try again later.', color: 'error' })

      return
    }

    if (response?.data?.message) {
      snackbarStore.open({ text: response.data.message, color: response.data.success ? 'success' : 'error' })
    }

    return response
  },
  error => {
    const snackbarStore = useSnackbarStore(), loadingStore = useLoadingStore(), authStore = useAuthStore()

    handleLoading = true
    loadingStore.isLoading = false
    loadingStore.isInlineLoading = false

    if (error.response.status === 401) {
      snackbarStore.open({ text: error.response.data.message, color: 'error' })
      authStore.isAuthenticated = false
      setTimeout(() => {
        router.push({ name: 'login' })
      }, 500);
      // authStore.redirectToLogin()
      return
    } else if (error.response.status === 422) {
      snackbarStore.open({ text: error.response.data.message[0], color: 'error' })
    } else if (error.response.status === 400) {
      snackbarStore.open({ text: error.response.data.message, color: 'error' })
    }

    // Network Error
    if (error && error.message === 'Network Error') {
      snackbarStore.open({ text: 'There was a network error. Please try again later.', color: 'error' })
    }

    return Promise.reject(error)
  }
)

// Function to cancel the current request
// api.cancelRequest = () => {
//   if (cancelRequest) {
//     cancelRequest('Request cancelled by user');
//   }
// };

export default api
