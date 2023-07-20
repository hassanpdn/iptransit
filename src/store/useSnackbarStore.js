import { defineStore } from 'pinia'
import { generateUniqueId } from "@/@core/utils"

export const useSnackbarStore = defineStore({
  id: 'snackbar',
  state: () => ({
    messages: [],
    route: ''
  }),
  actions: {
    open({ text, color }) {
      this.messages.push({
        text : text,
        color : color || 'success',
        show : true,
        id: generateUniqueId()
      })
    },
    close(id){
      this.messages = this.messages.filter(i => i.id !== id)
    },
    resetMessages(){
      this.messages = []
    }
  },
})
