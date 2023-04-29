import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as assets from './plugins/vuetify'
import moment from 'moment';
import EventsMixins from './mixins/EventsMixins'

// Event handling
import mitt from 'mitt'

import('./utils/helpers')

window.moment = moment
const emitter = mitt()
const vuetify = createVuetify({
  components,
  directives,
  assets
})

const app = createApp(App)

app.config.globalProperties.emitter = emitter

app
  .mixin(EventsMixins)
  .use(router)
  .use(vuetify)
  .mount('#app')
