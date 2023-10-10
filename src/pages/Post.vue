<template>
  <PostSkeleton v-if="loading"/>
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
            :model-value="item.rating.review"
            readonly
            color="amber"
          ></v-rating>
          <p class="text-grey" :class="fontInfoText">
            {{ item.rating.review }} {{ translate("home.stars") }} | ({{ commentsLenght }} {{ translate("home.comments") }}) | {{ formatDate(item.created_at) }}
          </p>
        </div>
        <v-divider></v-divider>
        <div class="my-2 mx-0 px-0">
          <quill-editor
            v-model:content="item.description"
            contentType="html"
            :readOnly="true"
            theme="bubble"
          ></quill-editor>
        </div>
        <v-divider></v-divider>
        <Actions :model_reactions="item.reactions"/>
        <v-divider></v-divider>
        <Comments :model_id="item.id" />
        <v-divider></v-divider>
        <Create :model_id="item.id"/>
      </div>
    </v-card>
  </div>
</template>
<script>
import ResponsivePost from '../components/Common/Responsives/post.vue';
import PostService from '@/services/PostService.js'
import Table from '../components/Common/Table.vue';
import Comments from '../components/Comment/Comments.vue';
import Actions from '../components/Post/Actions.vue';
import Create from '../components/Comment/Create.vue';
import { initials, formatDate } from '../utils/helpers';
import PostSkeleton from '../components/Common/Skeletons/PostSkeleton.vue';

export default {
  extends: ResponsivePost,
  mixins: [initials, formatDate, Table],
  components: {
    Comments,
    Create,
    Actions,
    PostSkeleton
  },
  data() {
    return {
      loading: false,
      apiService: PostService,
      postId: null,
      item: null,
      preventSnackbar: true,
      comments: [],
      commentsLenght: 0
    }
  },
  methods: {
    getCommentLength() {
      setTimeout(() => { this.commentsLenght = this.item.comments.length }, 500);
    },
    addCommentLenght () {
      this.commentsLenght++
    },
    reduceCommentLenght() {
      setTimeout(() => { this.commentsLenght = this.commentsLenght - 1 }, 1000)
      
    },
    updatePost(resp) {
      this.item.rating = resp.rating

      if (this.item.reactions.length <= 0) {
        this.item.reactions[0] = resp
        return
      }

      let reactionsUpdated = this.item.reactions.map(function (reaction) {
        if (reaction.id === resp.id) {
          return resp
        }

        return reaction
      })

      this.item.reactions = reactionsUpdated
    }
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
    this.getCommentLength()
    this.listenEvent("add-new-comment-length", this.addCommentLenght)
    this.listenEvent("remove-comment-lenght", this.reduceCommentLenght)
    this.listenEvent("update-reaction-rating", this.updatePost)
  },
  beforeDestroy() {
    this.unlistenEvent("add-new-comment-length", this.addCommentLenght)
    this.unlistenEvent("remove-comment-lenght", this.reduceCommentLenght)
    this.unlistenEvent("update-reaction-rating", this.updatePost)
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