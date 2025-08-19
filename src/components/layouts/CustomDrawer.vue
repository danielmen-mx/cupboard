<template>
  <v-row justify="center">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width="700"
      class="pa-2"
      temporary
    >
      <Post v-if="this.admin === 'posts' && !loading" :item_parent="item" />
      <Product v-if="this.admin === 'products' && !loading" :item_parent="item" />
      <User v-if="this.admin === 'users' && !loading" :item_parent="item" />
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import Post from '../Admin/Forms/Post.vue'
import Product from '../Admin/Forms/Product.vue'
import User from '../Admin/Forms/User.vue'
import Table from '@/components/Common/Table.vue'
import PostService from '@/services/PostService'
import ProductService from '@/services/ProductService'
import UserService from '@/services/UserService'

export default {
  extends: Table,
  components: {
    Post,
    Product,
    User
  },
  data: () => ({
    drawer: false,
    admin: null,
    loading: false,
    apiService: null,
    preventSnackbar: true,
    itemId: null
  }),
  methods: {
    setData() {
      let params = this.$route.params
      this.admin = params.admin
      const services = {
        posts: PostService,
        products: ProductService,
        users: UserService,
      };

      this.apiService = services[this.admin] || null;

      if (!this.item && params.id) {
        this.itemId = params.id
        this.getItem()
      }

      if (params.action) return this.drawer = true
    },
    closeDrawer() {
      this.drawer = false
      this.admin = null
      this.item = null
      this.itemId = null
    }
  },
  mounted() {
    this.listenEvent('openDrawer', this.setData)
  },
  beforeDestroy() {
    this.unlistenEvent('openDrawer', this.setData)
  },
  watch: {
    '$route.params': {
      handler: function (params) {
        if (!params.action) return this.closeDrawer()
        if (this.drawer === true) return
        if (this.item) return
        return this.setData()
      },
      deep: true,
      immediate: true
    }
  },
}
</script>