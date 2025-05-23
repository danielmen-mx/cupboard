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
import language from './plugins/locales'
import moment from 'moment'
import EventsMixins from './mixins/EventsMixins'
import TranslationsMixins from './mixins/TranslationsMixins'
import globalSkeleton from './plugins/global-skeleton'
import "vuetify/styles"

// Event handling
import mitt from 'mitt'

import('./utils/helpers')
import "./router/guard"

// Text editor
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

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
  .mixin(TranslationsMixins)
  .component('QuillEditor', QuillEditor)
  .use(language)
  .use(store)
  .use(globalSkeleton)
  .use(router)
  .use(vuetify)
  .mount('#app')