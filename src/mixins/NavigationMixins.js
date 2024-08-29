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
          path: "openUserSettings"
        },
        {
          title: 'user-settings.cart',
          icon: 'mdi-cart',
          path: "openCartPage"
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
      if (path === "openUserSettings") {
        if (this.$route.fullPath === "/admin/settings") return this.$router.push("/admin/settings")
        return this.fireEvent(path)
      } else if (path === "openCartPage") {
        let userId = store.getters['user'].id
        let route = "/cart/" + userId
        return this.$router.push(route)
      }

      return this.$router.push({ path: path })
    },
    requireAdmin(require) {
      if (!require) return true
      if (this.admin == true && require == true) return true
      return false
    },
    updateUsername(username) {
      this.user = username
    }
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

    this.listenEvent("update-username-in-navigation-bar", this.updateUsername)
  },
}