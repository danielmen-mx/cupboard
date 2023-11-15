<template>
  <v-row justify="center">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width="700"
      class="pa-2"
      temporary
    >
      <Post v-if="this.admin === 'posts'" />
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import Post from '../Admin/Forms/Post.vue'

export default {
  components: {
    Post
  },
  data: () => ({
    drawer: false,
    admin: null,
  }),
  methods: {
    setData() {
      let params = this.$route.params
      this.admin = params.admin

      if (params.action) return this.drawer = true
    },
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
        if (!params.action) return this.drawer = false
        if (this.drawer === true) return
        return this.setData()
      },
      deep: true,
      immediate: true
    }
  },
}
</script>