import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
import { useAuthStore } from '@/store/useAuthStore'
import { useSnackbarStore } from '@/store/useSnackbarStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...setupLayouts(routes),
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if(from.meta.requiresAuth && from.meta.name !== 'login') {
    const snackbarStore = useSnackbarStore()
    
    snackbarStore.resetMessages()
  }
  // if (to.meta.requiresAuth && !authStore.isLoggedIn) next({ name: 'login' })
  else if (!to.meta.requiresAuth && authStore.isLoggedIn) next({ name: 'index' })
  else next()
})

export default router
