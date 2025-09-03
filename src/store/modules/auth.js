export const state = {
  user: null,
  token: null
}

export const getters = {
  user: (state) => state.user,
  token: (state) => state.token,
  token_expiration: (state) => state.token ? state.token.expires : null,
}

export const mutations = {
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
  logout(state) {
    state.user = null;
    state.token = null;
    state.language = null
    localStorage.removeItem("wud-user-token")
    localStorage.removeItem("wud-admin-user")
    localStorage.removeItem("language")
    Cookies.remove("wud_token")
    Cookies.remove("wud_expires")
  },
}

export const actions = {
  async logout({ commit }) {
    try {
      // await Api.post("/logout");
    } catch (e) { }
    commit("logout");
  },
};