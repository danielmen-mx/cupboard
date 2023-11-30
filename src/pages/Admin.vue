<template>
  <v-card>
    <Header />
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
        <span class="font-weight-medium">{{ translate(tab.title) }}</span>
      </v-tab>
    </v-tabs>
    <v-divider></v-divider>
    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="main">
          <Welcome v-if="tab === 'main'" />
        </v-window-item>
        <v-window-item value="settings">
          <Settings v-if="tab === 'settings'" />
        </v-window-item>
        <v-window-item value="posts">
          <Posts v-if="tab === 'posts'" />
        </v-window-item>
        <v-window-item value="products">
          <Products v-if="tab === 'products'" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script>
import Welcome from '@/components/Admin/Welcome.vue'
import Header from '../components/Admin/Main.vue'
import Settings from '@/components/Admin/Settings.vue'
import Posts from '@/components/Admin/Posts.vue'
import Products from '@/components/Admin/Products.vue'

export default {
  components: {
    Welcome,
    Header,
    Settings,
    Posts,
    Products
  },
  data: () => ({
    tab: 'main',
    tabs: [
      {
        title: 'settings',
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
        title: 'products',
        value: 'products',
        path: '/admin/products',
        component: null
      },
    ]
  }),
  methods: {
    pushRoute(route) {
      this.$router.push(route)
      if (route === '/admin') setTimeout(() => { this.tab = 'main' }, 100)
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