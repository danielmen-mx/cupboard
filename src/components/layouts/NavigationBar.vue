<template>
  <div v-resize="onResize" >
    <v-app-bar>
      <div class="buttons-group ml-2" >
        <v-app-bar-nav-icon v-if="navIcon" variant="text" @click="openNavigationDrawer()"></v-app-bar-nav-icon>
        <v-btn
          v-if="!navIcon"
          v-for="nav in navs"
          :key="nav.title"
          variant="text"
          v-show="requireAdmin(nav.require_admin)"
          active-color="info"
          @click="redirect(nav.path)"
        >
          {{ nav.title }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-title class="custom-main-title">
        <strong
        class="cursor-pointer satisfy-font font-size-main-title"
        @click="$router.push('/')"
        >
          Shaddai Shop
        </strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="buttons-group mr-2" >
        <v-btn
          v-if="navIcon"
          icon="mdi-account-key"
          @click="login()"
        ></v-btn>
        <v-btn
          v-else
          @click="login()"
        >
          Registrarse | Iniciar sesión
        </v-btn>
        <!-- <v-btn @click="toogleTheme()" text rounded :icon="night ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-btn> -->
      </div>
    </v-app-bar>
  </div>z
</template>
<script>
import responsiveLayout from '../Common/Responsives/layout.vue'

export default {
  extends: responsiveLayout,
  data() {
    return {
      admin: true,
      night: false,
      navs: [
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
    openNavigationDrawer() {
      this.$nextTick(() => {
        this.fireEvent('openNavigationDrawer')
      })
    },
    toogleTheme() {
      this.night = !this.night
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    redirect(path) {
      this.$router.push({ path: path})
    },
    login() {
      this.$router.push({ path: '/login'})
    },
    requireAdmin(require) {
      if (!require) return true
      if (this.admin == true && require == true) return true
      return false
    }
  },
}
</script>
<style>
  .custom-main-title {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding-right: 30px;
    z-index: 0;
  }

  .buttons-group {
    z-index: 1;
  }
</style>