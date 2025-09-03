import Cookies from 'js-cookie'
import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      user: null,
      token: null,
      language: 'en',
      theme: 'light'
    }
  },
  getters: {
    user: (state) => state.user,
    theme: (state) => state.theme,
    language: (state) => state.language,
    token: (state) => state.token,
    token_expiration: (state) => state.token ? state.token.expires : null,
  },
  mutations: {
    setToken(state, { token, expires }) {
      state.token = {
        token: token,
        expires: expires
      }

      localStorage.setItem("wud-user-token", JSON.stringify(state.token))
    },
    setUser(state, { user }) {
      state.user = user
      state.email = user.email
      localStorage.setItem("wud-admin-user", JSON.stringify(state.user))
    },
    setUserAdmin(state, { user }) {
      state.user = user
      state.email = user.email
      state.isAdmin = user.isAdmin
      localStorage.setItem("wud-admin-user", JSON.stringify(state.user))
    },
    setLanguage(state, { language }) {
      state.language = language
      localStorage.setItem("language", JSON.stringify(state.language))
    },
    setName(state, { name }) {
      var user = state.user
      user.first_name = user.first_name
      user.last_name = user.last_name
      user.fullname = name
      state.user = user
      localStorage.setItem("wud-admin-user", JSON.stringify(state.user))
    },
    setEmail(state, { email }) {
      var user = state.user
      user.email = email
      state.user = user
      localStorage.setItem("wud-admin-user", JSON.stringify(state.user))
    },
    setTheme(state, { theme }) {
      state.theme = theme
      localStorage.setItem("wud-user-theme", JSON.stringify(state.theme))
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.theme = 'light'
      state.language = null
      localStorage.removeItem("wud-user-token");
      localStorage.removeItem("wud-admin-user");
      localStorage.removeItem("wud-user-theme");
      localStorage.removeItem("language");
      Cookies.remove("wud_token");
      Cookies.remove("wud_expires");
    },
  },
  actions: {
    async logout({ commit }) {
      try {
        // await Api.post("/logout");
      } catch (e) { }
      commit("logout");
    },
  }
})

export default store