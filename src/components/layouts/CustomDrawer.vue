<template>
  <v-row justify="center">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width="700"
      class="pa-2"
      temporary
    >
      <v-card class="mx-auto pa-2 ma-2 elevation-0 bg-grey-lighten-4">
        <template class="d-flex justify-space-between pa-2">
          <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <v-avatar
              color="blue-accent-3"
              size="24"
              v-text="step"
            ></v-avatar>
            <span class="pl-2">{{ currentTitle() }}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn
              icon="mdi-close-circle-outline"
              @click="closeDrawer()"
            ></v-btn>
          </v-card-actions>
        </template>

        <Post v-if="this.admin === 'posts'" :current_step="step"/>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            v-if="step > 1"
            variant="text"
            @click="step--"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="step < 3"
            color="light-green"
            variant="flat"
            @click="step++"
          >
            Next
          </v-btn>
          <v-btn
            v-else
            :disabled="!formComplete"
            color="light-green"
            variant="flat"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
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
    step: 1,
    drawer: false,
    admin: null,
    formComplete: false,
    titles: {
      posts: [
        { title: "basic_information" },
        { title: "autor_information" }
      ],
      products: [
        { title: "basic_information" },
        { title: "prices_information" }
      ]
    }
  }),
  computed: {
    //
  },
  methods: {
    closeDrawer() {
      this.$router.push({ path: "/admin/" + this.admin })
      this.step = 1
    },
    currentTitle() {
      let titles = this.titles[this.admin]
      if (!titles) return

      switch (this.step) {
        case 1: return this.translate(titles[0].title)
        case 2: return this.translate(titles[1].title)
        default: return 'Preview'
      }
    },
  },
  watch: {
    '$route.params': {
      handler: function (params) {
        if (!this.$route.fullPath.includes("/admin")) return this.step = 1
        this.admin = params.admin

        if (params.action) return this.drawer = true
      },
      deep: true,
      immediate: true
    }
  },
}
</script>