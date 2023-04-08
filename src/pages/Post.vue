<template>
  <v-card v-if="!loading" class="elevation-1 pa-2">
    <!-- <v-btn
      icon="mdi-keyboard-backspace"
      color="orange-darken-4"
      @click="$router.push('/')"
      class="back-button"
    >
    </v-btn> -->
    <v-img
      v-show="post.image"
      :src="post.image"
      lazy-src="/logo/shadai-main.jpeg"
      height="300"
      cover
      class="custom-image"
    ></v-img>
    <div class="elevation-0 mt-1">
      <div>
        <div class="text-h3 ma-2">
          {{ post.name }}
        </div>
      </div>
      <div class="d-flex align-center">
        <v-rating
          :model-value="post.rating"
          readonly
          color="amber"
        ></v-rating>
        <p class="text-grey text-h6">
          {{ post.rating }} stars | ({{ comments.length }} comentarios) | {{ formatDate(post.created_at) }}
        </p>
      </div>
      <v-divider></v-divider>
      <div class="text-h6 ma-2">
        {{ post.description }}
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="orange">
          Me gusta
        </v-btn>
        <v-btn color="orange">
          Comentar
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <!-- <Comments /> -->
      <v-divider></v-divider>
      <div class="my-2 ml-1 mr-3">
        <v-form>
          <v-text-field
            v-model="comment"
            :disabled="sendingMessage"
            append-icon="mdi-send"
            clear-icon="mdi-close-circle"
            clearable
            label="Message"
            type="text"
            @click:append="sendComment"
            
          >
            <template v-slot:append-inner>
              <v-fade-transition leave-absolute>
                <v-progress-circular
                  v-if="sendingMessage"
                  color="info"
                  indeterminate
                  size="24"
                ></v-progress-circular>
              </v-fade-transition>
            </template>
          </v-text-field>
        </v-form>
      </div>
    </div>
  </v-card>
</template>
<script>
import ResponsivePosts from '../components/Common/ResponsivePosts.vue';
import PostService from '@/services/PostService.js'
import { initials, formatDate } from '../utils/helpers';

export default {
  mixins: [initials, formatDate],
  extends: ResponsivePosts,
  data() {
    return {
      loading: false,
      sendingMessage: false,
      apiService: PostService,
      postId: null,
      post: {},
      comment: '',
      comments: [
        {
          id: 1,
          autor: "Daniel Mendez",
          comment: "this is a little comment, doesn't hurt anyone"
        },
        {
          id: 2,
          autor: "Dinosaurio Mendez",
          comment: "that's good"
        },
        {
          id: 3,
          autor: "Fili Mendez",
          comment: "hey did u come home early, because im boring and i miss u guys, dino is good but he doesn't want to play with me, i like so much to play with u both, but with dino, well u undesrtand that i didnt like u so much, well i hope you're coming home right now, love u, come for me please, hey did u come home early, because im boring and i miss u guys, dino is good but he doesn't want to play with me, i like so much to play with u both, but with dino, well u undesrtand that i didnt like u so much, well i hope you're coming home right now, love u, come for me please"
        },
        {
          id: 4,
          autor: "Jhovana Solis",
          comment: "dont be bad boys i love u so much, hope you're ok"
        },
      ]
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
    },
    sendComment() {
      console.log('sending comment...')
      this.sendingMessage = true
      setTimeout(() => {
        this.sendingMessage = false
        console.log('finishing sending...')
      }, 5000);
    }
  },
  computed: {
    progress () {
      return Math.min(100, this.comment.length * 10)
    },
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