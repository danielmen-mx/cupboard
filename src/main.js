import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import moment from 'moment';

// Event handling
import mitt from 'mitt'

window.moment = moment
const emitter = mitt()
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.config.globalProperties.emitter = emitter

app
  .use(router)
  .use(vuetify)
  .mount('#app')
