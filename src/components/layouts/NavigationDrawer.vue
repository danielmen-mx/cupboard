<template>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    color="grey-lighten-3"
    width="250"
  >
    <v-list
      :lines="false"
      nav
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        v-show="requireAdmin(item.require_admin)"
        active-color="info"
        @click="redirect(item.path)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    admin: true,
    drawer: false,
    group: null,
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
        path: '/'
      },
      {
        title: 'Reviews',
        icon: 'mdi-star-circle',
        require_admin: false,
        path: '/'
      },
    ],
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },

  methods: {
    redirect(path) {
      this.$router.push({ path: path})
    },
    requireAdmin(require) {
      if (!require) return true
      if (this.admin == true && require == true) return true
      return false
    }
  },
  mounted() {
    // add login to see admin option in list items
    this.emitter.on('openNavigationDrawer', () => {
      this.drawer = !this.drawer
    })
  },
}
</script>