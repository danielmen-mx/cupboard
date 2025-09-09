import router from "."
import store from "../store"

function tokenHasExpired(expiration) {
  return expiration < Math.floor(Date.now() / 1000);
}

let isAutheticated = () => {
  let token = store.getters['token']
  let user = store.getters['user']

  if (!token && !user) {
    token = JSON.parse(localStorage.getItem("wud-user-token"))
    user = JSON.parse(localStorage.getItem("wud-admin-user"))

    if (user && token) {
      store.commit('setUser', { user: user })
      store.commit('setToken', { token: token.token, expires: token.expires })
    }
  }

  if (!token || !user) {
    // console.log('User with error in authentication...')
    store.commit('logout')
    return false;
  }

  return !tokenHasExpired(token.expires)
}

let isAdmin = () => {
  let userAuth = isAutheticated()

  if (userAuth) {
    let user = store.getters['user']
    // console.log(user)
  
    if (user.is_admin) {
      return true
    }
  }

  return false
}

function routesNoAuth(route) {
  var routes = [
    'login',
    'register',
    'recover',
    'reset-password',
    'forgot',
    'password',
    'home',
    'store',
    'contact',
    'test'
  ]

  return routes.includes(route)
}

function setTheme() {
  let theme = store.getters['theme']

  if (theme == 'light') {
    theme = JSON.parse(localStorage.getItem("wud-user-theme"))

    if (theme) {
      store.commit('setTheme', { theme: theme })
    }
  }
}

function routes(to, from, next) {

  setTheme()

  if (!to.meta.requiresAuth && routesNoAuth(to.name)) {
    return next()
  }

  if (!to.meta.requiresAdminAuth && routesNoAuth(to.name)) {
    return next()
  }

  let userAuth = isAutheticated();
  let adminAuth = isAdmin();

  if (!userAuth && to.name != 'login') {
    return router.replace({ 
      name: "login",
      query: { redirect: to.fullPath }
     });
  }

  if (userAuth && to.name == 'login') {
    return router.replace({ name: "home" });
  }

  if (!adminAuth && to.name == 'admin') {
    if (!userAuth) {
      return router.replace({ name: "login" })
    }

    return router.replace({ name: "home" })
  }

  next()
}

router.beforeEach((to, from, next) => {
  routes(to, from, next)
})