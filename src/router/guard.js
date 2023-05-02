import router from ".";

// how to autheticate my session from laravel and set on vue ?
let isAutheticated = () => {
  if (window.token != undefined || window.token != null) {
    return true
  }

  return false
}

let isAdmin = () => {
  if (window.isAdmin != undefined || window.token != null) {
    return true
  }

  return false
}

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    if (!isAutheticated() && to.name !== 'login') {
      return { name: 'login' }
    }
  }

  if (to.meta.requiresAdminAuth) {
    if (!isAdmin() && to.name !== 'login') {
      return { name: 'login' }
    }
  }
})