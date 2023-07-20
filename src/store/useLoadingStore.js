import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('useLoadingStore', {
  state : () => ({
    isLoading : false,
    isInlineLoading: false
  }),
  actions: {
    setLoading(isLoading){
      this.isLoading = isLoading
    },
    setInlineLoading(isInlineLoading){
      this.isInlineLoading = isInlineLoading
    }
  }
})
