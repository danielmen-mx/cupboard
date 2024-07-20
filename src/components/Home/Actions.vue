<template>
  <HomeActionsSkeleton v-if="loading" />
  <v-list-item class="w-100" v-else>
    <template v-slot:prepend>
      <v-avatar color="orange-darken-4" >
        <span class="text-h5">{{ initials(model.autor) }}</span>
      </v-avatar>
    </template>
    <v-list-item-title>{{ model.autor }}</v-list-item-title>
    <v-list-item-subtitle>{{ translate("autor") }}</v-list-item-subtitle>
    <template v-slot:append>
      <div :class="mainClass">
        <v-icon :class="heartClass" :icon="heartIcon" :color="heartColor" @click="validateLogin()"></v-icon>
        <span class="subheading me-2">{{ postReactions }}</span>
        <span class="me-1">·</span>
        <v-icon class="me-1" icon="mdi-comment" color="blue" @click="redirect(model.id, true)"></v-icon>
        <span class="subheading">{{ model.comments.length }}</span>
      </div>
    </template>
  </v-list-item>
</template>
<script>
import HomeActionsSkeleton from '@/components/Common/Skeletons/HomeActionsSkeleton.vue'
import Reactions from '../Common/Reactions.vue'
import { initials, findItemById } from '../../utils/helpers'
import { isAuthenticated } from '../../utils/authentication'

export default {
  extends: Reactions,
  mixins: [initials, findItemById, Reactions],
  props: {
    parent_class: {
      type: String,
      required: true
    },
    parent_post: {
      type: Object,
      required: true
    }
  },
  components: {
    HomeActionsSkeleton
  },
  data() {
    return {
      itemId: null,
      mainClass: 'justify-self-end',
    }
  },
  methods: {
    setData() {
      this.mainClass = this.parent_class
      this.model = this.parent_post
      this.modelType = "App\\Models\\Cupboard\\Post"
      this.getReactions()
    },
    redirect(id, focusCommentInput = false) {
      this.$router.push({ path: '/post/' + id })

      if (!focusCommentInput) return

      this.$nextTick(() => { this.fireEvent('focus-comment-input') })
    },
    successCallBack(resp) {
      this.updateItems(resp)
      this.parent_post.reactions = this.reactions
      this.parent_post.rating = resp.rating
      this.$nextTick(() => { this.fireEvent('update-reactions', this.parent_post) })
      this.setForm()
    },
  },
  computed: {
    postReactions() {
      let num = 0

      if (this.reactions.length <= 0) return num

      this.reactions.map(reaction => {
        if (reaction.reaction === true) num++
      })

      return num
    },
  },
  mounted() {
    this.setData()
  },
}
</script>