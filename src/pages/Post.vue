<template>
  <!-- TODO: add empty state -->
  <div v-if="item" v-resize="onResize">
    <v-card v-if="!loading" class="elevation-1 pa-2">
      <v-btn
        v-if="item.image"
        icon="mdi-keyboard-backspace"
        color="orange-darken-4"
        @click="$router.push('/')"
        class="back-button"
      >
      </v-btn>
      <v-img
        v-show="item.image"
        :src="item.image"
        lazy-src="/logo/shadai-main.jpeg"
        height="300"
        cover
        class="custom-image"
      ></v-img>
      <div class="elevation-0 mt-1">
        <div>
          <div class="text-h3 ma-2">
            {{ item.name }}
          </div>
        </div>
        <div class="d-flex align-center">
          <v-rating
            :model-value="item.rating"
            readonly
            color="amber"
          ></v-rating>
          <p class="text-grey" :class="fontInfoText">
            {{ item.rating }} stars | ({{ item.comments.length }} comentarios) | {{ formatDate(item.created_at) }}
          </p>
        </div>
        <v-divider></v-divider>
        <div class="text-h6 ma-2">
          {{ item.description }}
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
        <Comments :post_id="item.id" />
        <v-divider></v-divider>
        <Create :post_id="item.id"/>
      </div>
    </v-card>
  </div>
</template>
<script>
import ResponsivePost from '../components/Common/Responsives/post.vue';
import PostService from '@/services/PostService.js'
import Table from '../components/Common/Table.vue';
import Comments from '../components/Comment/Comments.vue';
import Create from '../components/Comment/Create.vue';
import { initials, formatDate } from '../utils/helpers';

export default {
  extends: ResponsivePost,
  mixins: [initials, formatDate, Table],
  components: {
    Comments,
    Create
  },
  data() {
    return {
      loading: false,
      apiService: PostService,
      postId: null,
      item: null,
      preventSnackbar: true,
      comments: []
    }
  },
  methods: {
    //
  },
  computed: {
    progress () {
      return Math.min(100, this.comment.length * 10)
    },
  },
  mounted() {
    this.itemId = this.$route.params.id
    if (!this.itemId) return this.$router.push('/')
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