<template>
  <v-app-bar>
    <div class="buttons-group ml-2">
      <v-btn
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
      class="cursor-pointer"
      @click="$router.push('/')"
      >
        Shaddai Shop
      </strong>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn @click="toogleTheme()" text rounded :icon="night ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-btn>
  </v-app-bar>
</template>
<script>
export default {
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
      ],
    }
  },
  methods: {
    openNavigationDrawer() {
      this.$nextTick(() => {
        this.emitter.emit('openNavigationDrawer')
      })
    },
    toogleTheme() {
      this.night = !this.night
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    redirect(path) {
      this.$router.push({ path: path})
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