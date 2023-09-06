import store from "../store"
import { isAuthenticated, isAdmin } from "../utils/authentication"

export default {
  data() {
    return {
      user: '',
      admin: false,
      isLogged: false,
      night: false,
      userSettings: [
        {
          title: 'user-settings.settings',
          // icon: 'mdi-settings',
          icon: 'mdi-wrench',
          path: ""
        },
        {
          title: 'user-settings.cart',
          icon: 'mdi-cart',
          path: ""
        },
        {
          title: 'user-settings.shopping',
          icon: 'mdi-shopping',
          path: ""
        },
      ],
      items: [
        {
          title: "nav.admin",
          icon: 'mdi-account-circle',
          require_admin: true,
          path: '/admin'
        },
        {
          title: 'nav.home',
          icon: 'mdi-home',
          require_admin: false,
          path: '/'
        },
        {
          title: 'nav.store',
          icon: 'mdi-store',
          require_admin: false,
          path: '/store'
        },
        {
          title: 'nav.reviews',
          icon: 'mdi-star-circle',
          require_admin: false,
          path: '/review'
        },
        {
          title: 'nav.contact',
          icon: 'mdi-account',
          require_admin: false,
          path: '/contact'
        },
      ],
    }
  },
  methods: {
    closeDrawer() { },
    redirect(path) {
      this.$router.push({ path: path })
    },
    requireAdmin(require) {
      if (!require) return true
      if (this.admin == true && require == true) return true
      return false
    },
  },
  mounted() {
    let userAuth = isAuthenticated()
    let adminAuth = isAdmin()

    if (userAuth) {
      this.isLogged = true
      let user = store.getters['user']

      if (user) {
        this.user = user.username
      }
    }

    if (adminAuth) {
      this.admin = true
    }
  },
}