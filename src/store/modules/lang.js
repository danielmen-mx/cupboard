import vuetify from "../../plugins/vuetify";

export const state = {
  language: 'en',
}

export const getters = {
  language: (state) => state.language,
}

export const mutations = {
  language(state, language) {
    state.language = language
  }
}

export const actions = {
  translate({ }, key) {
    // return vuetify.lang
  }
}