<template>
  <v-app-bar>
    <!-- <v-app-bar-nav-icon variant="text" @click="openNavigationDrawer()"></v-app-bar-nav-icon> -->
    <div>
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

    <v-toolbar-title
      class="text-center ml-13 cursor-pointer custom-main-title"
      @click="$router.push('/')"
    >
      Shaddai Shop
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
    position: fixed;
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding-right: 80px;
  }
</style>