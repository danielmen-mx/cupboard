import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'
import store from "../store"

let user = store.getters['user']
var localLang = store.getters['language']
console.log(localLang)
if (!user) user = JSON.parse(localStorage.getItem("wud-admin-user"))
if (!user && !localLang) localLang = 'en'
if (user) localLang = user.language

console.log(localLang)

let translate = createI18n({
  locale: localLang,
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en, es
  }
})

export default translate