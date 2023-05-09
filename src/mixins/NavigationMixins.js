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
          title: 'Configuraciones',
          // icon: 'mdi-settings',
          icon: 'mdi-wrench',
          path: ""
        },
        {
          title: 'Carrito',
          icon: 'mdi-cart',
          path: ""
        },
        {
          title: 'Mis compras',
          icon: 'mdi-shopping',
          path: ""
        },
      ],
      items: [
        {
          title: 'Admin',
          icon: 'mdi-account-circle',
          require_admin: true,
          path: '/admin'
        },
        {
          title: 'Home',
          icon: 'mdi-home',
          require_admin: false,
          path: '/'
        },
        {
          title: 'Store',
          icon: 'mdi-store',
          require_admin: false,
          path: '/store'
        },
        {
          title: 'Reviews',
          icon: 'mdi-star-circle',
          require_admin: false,
          path: '/review'
        },
        {
          title: 'Contact',
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