<template>
  <v-app-bar>
    <v-app-bar-nav-icon variant="text" @click="openNavigationDrawer()"></v-app-bar-nav-icon>
    
    <v-spacer class="ml-16"></v-spacer>
    <v-toolbar-title class="text-center ml-13">Shaddai Shop</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn variant="text" icon="mdi-magnify"></v-btn>
    <v-btn variant="text" icon="mdi-filter"></v-btn>
    <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>
</template>
<script>
export default {
  methods: {
    openNavigationDrawer() {
      this.$nextTick(() => {
        this.emitter.emit('openNavigationDrawer')
      })
    }
  },
}
</script>