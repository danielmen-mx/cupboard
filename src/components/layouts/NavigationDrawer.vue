<template>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    color="grey-lighten-3"
    width="300"
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
      <v-divider></v-divider>
      <div
       class="text-subtitle-2 ml-1"
      >
        Made with love ❤️
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    admin: false,
    drawer: false,
    group: null,
    event: 'openNavigationDrawer',
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
    },
    handle() {
      this.drawer = !this.drawer
    }
  },
  mounted() {
    // add login to see admin option in list items
    this.listenEvent(this.event, this.handle)
  },
}
</script>