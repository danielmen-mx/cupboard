<template>
  <v-card v-if="!loading" class="elevation-1 pa-2">
    <v-btn
      icon="mdi-keyboard-backspace"
      color="orange-darken-4"
      @click="$router.push('/')"
      class="back-button"
    >
    </v-btn>
    <v-img
      :src="post.image"
      lazy-src="/logo/shadai-main.jpeg"
      height="300"
      cover
      class="custom-image"
    ></v-img>
    
    <v-card class="elevation-0 mt-1">
      <p class="text-h3 ma-2">
        {{ post.name }}
      </p>
      <div class="d-flex">
        <v-rating
          :model-value="post.rating"
          readonly
          color="amber"
        ></v-rating>
        <p class="text-grey">
          {{ post.rating }} ({{ post.reaction }})
        </p>
      </div>
      <v-divider></v-divider>
      <p class="text-h6 ma-2">
        {{ post.description }}
      </p>
    </v-card>
  </v-card>
</template>
<script>
import ResponsivePosts from '../components/Common/ResponsivePosts.vue';
import PostService from '@/services/PostService.js'

export default {
  extends: ResponsivePosts,
  data() {
    return {
      loading: false,
      apiService: PostService,
      postId: null,
      post: {}
    }
  },
  methods: {
    async getItem() {
      try {
        this.loading = true

        const resp = await this.apiService.show(this.postId)

        this.post = resp.data.data
        this.loading = false
      } catch (error) {
        this.loading = false
        console.log(error)
      }
    }
  },
  mounted() {
    this.postId = this.$route.params.id
    if (!this.postId) return this.$router.push('/')
    this.getItem()
  },
}
</script>
<style>
  .back-button {
    position: absolute;
    z-index: 1;
  }

  .custom-image {
    z-index: 0;
  }

  .post-custom-title {
    z-index: 1;
    opacity: 0.8;
  }
</style>