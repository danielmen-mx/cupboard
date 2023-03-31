<template>
  <v-app-bar>
    <v-app-bar-nav-icon variant="text" @click="openNavigationDrawer()"></v-app-bar-nav-icon>
    
    <v-spacer class="ml-16"></v-spacer>
    <v-toolbar-title class="text-center ml-13">Shaddai Shop</v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- <v-btn variant="text" icon="mdi-magnify"></v-btn>
    <v-btn variant="text" icon="mdi-filter"></v-btn> -->
    <v-btn @click="toogleTheme()" text rounded :icon="night ? 'mdi-weather-sunny' : 'mdi-weather-night'"></v-btn>
  </v-app-bar>
</template>
<script>
export default {
  data() {
    return {
      night: false
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
    }
  },
}
</script>