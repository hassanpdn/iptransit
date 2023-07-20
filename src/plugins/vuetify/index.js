import { createVuetify } from 'vuetify'
import { icons } from './icons'
import theme from './theme'
import * as defaults from './defaults'

// Styles
import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default createVuetify({
  defaults: {...defaults},
  icons,
  theme,
})
