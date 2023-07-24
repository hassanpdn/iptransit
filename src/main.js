/* eslint-disable import/order */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { loadFonts } from '@/plugins/webfontloader'

import App from '@/App.vue'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'
import router from '@/router'
import Vue3PersianDatetimePicker from 'vue3-persian-datetime-picker'
import layoutsPlugin from '@/plugins/layouts'
import mitt from 'mitt'

import '@/@iconify/icons-bundle'
import '@core/scss/template/index.scss'
import '@styles/styles.scss'


loadFonts()

const emitter = mitt()
// Create vue app
const app = createApp(App)

const pinia = createPinia()

pinia.use(createPersistedState())

// Use plugins
app.use(vuetify)
app.use(router)
app.use(i18n)
app.use(pinia)
app.use(layoutsPlugin)
app.use(Vue3PersianDatetimePicker, {
  name: 'DatePicker',
  props: {
    format: 'YYYY-MM-DD HH:mm',
    displayFormat: 'jYYYY-jMM-jDD',
    editable: false,
    inputClass: 'form-control my-custom-class-name',
    placeholder: 'Please select a date',
    altFormat: 'YYYY-MM-DD HH:mm',
    color: 'rgb(var(--v-theme-primary))',
    autoSubmit: false
  }
})
app.config.globalProperties.emitter = emitter

// Mount vue app
app.mount('#app')
