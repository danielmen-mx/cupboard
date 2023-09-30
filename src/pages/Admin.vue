<template>
  <v-card>
    <Main />
    <v-tabs
      v-model="tab"
      bg-color="transparent"
      color="light-green"
      grow
    >
      <v-tab
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
        @click="pushRoute(tab.path)"
      >
        {{ translate(tab.title) }}
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="main">
          <Welcome />
        </v-window-item>
        <v-window-item value="settings">
          <Settings />
        </v-window-item>
        <v-window-item value="posts">
          <Posts />
        </v-window-item>
        <v-window-item value="products">
          <Products />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script>
import Welcome from '@/components/Admin/Welcome.vue'
import Main from '../components/Admin/Main.vue'
import Settings from '@/components/Admin/Settings.vue'
import Posts from '@/components/Admin/Posts.vue'
import Products from '@/components/Admin/Products.vue'

export default {
  components: {
    Welcome,
    Main,
    Settings,
    Posts,
    Products
  },
  data: () => ({
    tab: 'main',
    tabs: [
      {
        title: 'admin.setting',
        value: 'settings',
        path: '/admin/settings',
        component: null
      },
      {
        title: 'posts',
        value: 'posts',
        path: '/admin/posts',
        component: null
      },
      {
        title: 'admin.products',
        value: 'products',
        path: '/admin/products',
        component: null
      },
    ]
  }),
  methods: {
    pushRoute(route) {
      this.$router.push(route)
      if (route === '/admin') setTimeout(() => { this.tab = 'main' }, 500)
    }
  },
  mounted() {
    this.listenEvent('turn-dashboard', this.pushRoute)
  },
  watch: {
    '$route.params': {
      handler: function (params) {
          if (params.admin === undefined) return setTimeout(() => { this.tab = 'main' }, 100)
          if (params.admin === 'settings') this.tab = 'settings'
          if (params.admin === 'posts') return this.tab = 'posts'
          if (params.admin === 'products') return this.tab = 'products'
        },
        deep: true,
        immediate: true
      }
  },
}
</script>