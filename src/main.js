import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import * as assets from './plugins/vuetify'
import moment from 'moment'
import EventsMixins from './mixins/EventsMixins'
import { createI18n } from 'vue-i18n'

// Event handling
import mitt from 'mitt'

import('./utils/helpers')
import "./router/guard"
import en from './locales/en.json'
import es from './locales/es.json'

// Text editor
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

window.moment = moment
const emitter = mitt()
const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en, es
  }
})
const vuetify = createVuetify({
  components,
  directives,
  assets
})

const app = createApp(App)

app.config.globalProperties.emitter = emitter

app
  .mixin(EventsMixins)
  .component('QuillEditor', QuillEditor)
  .use(i18n)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount('#app')