<template>
  <v-card>
    <v-card-title>
      <v-parallax
        lazy-src="/logo/shadai-main.jpeg"
        height="300"
        class="rounded"
      >
        <div class="d-flex flex-column fill-height justify-center align-center">
          <div class="bg-black text-orange-darken-4 rounded text-center pa-4" style="opacity: 0.8;">
            <h1 class="text-h4 font-weight-thin mb-4">
              Shaddai
            </h1>
            <h4 class="subheading">
              Vamos a contruir algo increible!
            </h4>
          </div>
        </div>
      </v-parallax>
    </v-card-title>

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
        {{ tab.title }}
      </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="main">

        </v-window-item>
        <v-window-item value="setting">
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
import Settings from '@/components/Admin/Settings.vue'
import Posts from '@/components/Admin/Posts.vue'
import Products from '@/components/Admin/Products.vue'

export default {
  components: {
    Settings,
    Posts,
    Products
  },
  data: () => ({
    tab: 'main',
    tabs: [
      {
        title: 'Configuracion',
        value: 'setting',
        path: '/admin/settings',
        component: null
      },
      {
        title: 'Publicaciones',
        value: 'posts',
        path: '/admin/posts',
        component: null
      },
      {
        title: 'Productos',
        value: 'products',
        path: '/admin/products',
        component: null
      },
    ]
  }),
  methods: {
    pushRoute(route) {
      this.$router.push(route)
    }
  },
  watch: {
    '$route.params': {
        handler: function(params) {
          if (params.admin == undefined) this.tab = 'none'
          if (params.admin == 'settings') this.tab = 'setting'
          if (params.admin == 'posts') this.tab = 'posts'
          if (params.admin == 'products') this.tab = 'products'
        },
        deep: true,
        immediate: true
      }
  },
}
</script>