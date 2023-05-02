import store from "../store"

function tokenHasExpired(expiration) {
  return expiration < Math.floor(Date.now() / 1000);
}

export function isAuthenticated() {
  let token = store.getters['token']
  let user = store.getters['user']

  if (!token && !user) {
    token = JSON.parse(localStorage.getItem("wud-user-token"))
    user = JSON.parse(localStorage.getItem("wud-admin-user"))

    if (user && token) {
      store.commit('setUser', { user: user });
      store.commit('setToken', { token: token.token, expires: token.expires });
    }
  }

  if (!token || !user) {
    console.log('User with error in authentication...')
    store.commit('logout');
    return false;
  }

  return !tokenHasExpired(token.expires);
}

export function isAdmin() {
  let userAuth = isAuthenticated()

  if (userAuth) {
    let user = store.getters['user']
    // console.log(user)

    if (user.is_admin) {
      return true
    }
  }

  return false
}