import translate from "../plugins/locales";

export function updateLang(lang = null) {
  if (!lang) lang = 'en'
  translate.global.locale = lang
}