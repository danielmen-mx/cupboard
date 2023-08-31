<template>
  <HomeActionsSkeleton v-if="loading" />
  <v-list-item class="w-100" v-else>
    <template v-slot:prepend>
      <v-avatar color="orange-darken-4" >
        <span class="text-h5">{{ initials(post.autor) }}</span>
      </v-avatar>
    </template>
    <v-list-item-title>{{ post.autor }}</v-list-item-title>
    <v-list-item-subtitle>Autor</v-list-item-subtitle>
    <template v-slot:append>
      <div :class="mainClass">
        <v-icon class="me-1" icon="mdi-heart" color="red" @click="submit()"></v-icon>
        <span class="subheading me-2">{{ postReactions }}</span>
        <span class="me-1">·</span>
        <v-icon class="me-1" icon="mdi-comment" color="blue" @click="redirect(post.id, true)"></v-icon>
        <span class="subheading">{{ post.comments.length }}</span>
      </div>
    </template>
  </v-list-item>
</template>
<script>
import HomeActionsSkeleton from '@/components/Common/Skeletons/HomeActionsSkeleton.vue'
import store from '../../store'
import Form from '../Common/Form.vue'
import ReactionService from '@/services/ReactionService'
import { initials, findItemById } from '../../utils/helpers'

export default {
  extends: Form,
  mixins: [initials, findItemById],
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
      reactions: {},
      post: {},
      form: {},
      itemId: null,
      apiService: ReactionService,
      mainClass: 'justify-self-end',
      loading: true,
      preventSnackbar: true,
    }
  },
  methods: {
    setData() {
      this.mainClass = this.parent_class
      this.post = this.parent_post
      this.reactions = this.post.reactions??{}
    },
    redirect(id, focusCommentInput = false) {
      this.$router.push({ path: '/post/' + id })

      if (!focusCommentInput) return

      this.$nextTick(() => { this.fireEvent('focus-comment-input') })
    },
    setReaction() {
      if (this.reactions.length <= 0) return this.form.reaction = true

      this.reactions.map(reaction => {
        if (this.form.user_id === reaction.user.id) {
          this.itemId = reaction.id
          this.form.reaction = !reaction.reaction
        }
      })
    },
    updateItems(resp) {
      let newObj = []
      let match = this.findItemById(this.reactions, resp.id)

      if (match) {
        newObj = this.reactions.map(function (reaction) {
          if (reaction.id === resp.id) {
            return resp
          }
  
          return reaction
        })
      } else {
        newObj.push(resp)
      }

      this.reactions = newObj
      this.parent_post.reactions = newObj
      this.$nextTick(() => { this.fireEvent('update-reactions', this.parent_post) })
    },
    successCallBack(resp) {
      this.updateItems(resp)
      this.setForm()
    },
    setForm() {
      let user = this.setUserVar()
      this.form.post_id = this.post.id
      this.form.user_id = !user ? null : user.id
      this.setReaction()
    }
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
    this.setForm()
    this.loading = false
  },
}
</script>