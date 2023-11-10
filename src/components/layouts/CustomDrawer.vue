<template>
  <v-row justify="center">
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      width="700"
      class="pa-2"
      temporary
    >
      <v-card class="mx-auto pa-2 ma-2 elevation-0 bg-grey-lighten-5">
        <template class="d-flex justify-space-between pa-2">
          <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <v-avatar
              color="blue-accent-2"
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

        <Post v-if="this.admin === 'posts'" :current_step="step" :post_form="form" @enable_next_button="enableStepForwardButton" @enable_submit="enableSubmit" />

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            v-if="step > 1"
            variant="text"
            @click="step--"
          >
            {{ translate("back") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            v-if="step < 3"
            :disabled="!enableNextButton"
            color="blue-darken-3"
            variant="flat"
            @click="stepForward()"
          >
            {{ translate("next") }}
          </v-btn>
          <v-btn
            v-else
            :disabled="!enableSubmit"
            color="green"
            variant="flat"
          >
            {{ translate('create') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </v-row>
</template>
<script>
import Post from '../Admin/Forms/Post.vue'
import Form from '../Admin/Forms/Form.vue'
import PostService from '@/services/PostService'

export default {
  extends: {
    //
  },
  components: {
    Post
  },
  data: () => ({
    step: 1,
    drawer: false,
    admin: null,
    enableSubmit: false,
    enableNextButton: false,
    form: {},
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
    setData() {
      this.$nextTick(() => {
        let params = this.$route.params
  
        this.step = 1
        this.admin = params.admin
        this.apiService = this.admin === 'posts' ? PostService : null
        this.event = this.admin === 'posts' ? 'updatePostAdminTable' : 'updateProductAdminTable'
  
        if (params.action) return this.drawer = true
      })
    },
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
    enableStepForwardButton() {
      console.log('next button is unlocked')
      this.enableNextButton = true
    },
    stepForward() {
      this.step++
      this.enableNextButton = false
    },
    submit() {
      //
    }
  },
  mounted() {
    // if (!this.$route.params.action) return
    this.listenEvent('openDrawer', this.setData)
  },
  beforeDestroy() {
    this.unlistenEvent('openDrawer', this.setData)
  },
  watch: {
    '$route.params': {
      handler: function (params) {
        if (params.action) { this.setData() }
      },
      deep: true,
      immediate: true
    }
  },
}
</script>