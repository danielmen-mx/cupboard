<template>
  <HomeActionsSkeleton v-if="loading" />
  <v-list-item class="w-100" v-else>
    <template v-slot:prepend>
      <v-avatar color="orange-darken-4" >
        <span class="text-h5">{{ initials(post.autor) }}</span>
      </v-avatar>
    </template>
    <v-list-item-title>{{ post.autor }}</v-list-item-title>
    <v-list-item-subtitle>{{ translate("autor") }}</v-list-item-subtitle>
    <template v-slot:append>
      <div :class="mainClass">
        <v-icon :class="heartClass" :icon="heartIcon" :color="heartColor" @click="react()"></v-icon>
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
import Form from '../Common/Form.vue'
import ReactionService from '@/services/ReactionService'
import { initials, findItemById } from '../../utils/helpers'
import { isAuthenticated } from '../../utils/authentication'

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
      heartColor: 'grey',
      heartClass: 'me-1',
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
    react() {
      let logged = isAuthenticated()

      if (!logged) return this.$router.push({ path: '/login' })

      this.submit()
    },
    setReaction() {
      if (this.reactions.length <= 0) return this.form.reaction = true

      this.reactions.map(reaction => {
        if (this.form.user_id === reaction.user.id) {
          this.itemId = reaction.id
          this.form.reaction = !reaction.reaction
        }
      })

      if (this.form.reaction == null) this.form.reaction = true
    },
    updateItems(resp) {
      let newObj = []
      let match = this.findItemById(this.reactions, resp.id)

      // TODO: improve this merequetengue
      // map the reactions array:
      // if its empty add the resp
      // if contain something:
        // map the content to check if the reaction.id match with the resp.id
        // if match replace the content of the reaction with the resp
        // if isnt match just add the reaction in the newObj, dont change nothing
      // the result would be the newObj with the right values
      if (match) {
        newObj = this.reactions.map(function (reaction) {
          if (reaction.id === resp.id) {
            return resp
          }
  
          return reaction
        })
      } else {
        if (this.reactions.length >= 1) {
          newObj = this.reactions
        }

        newObj.push(resp)
      }

      this.reactions = newObj
      this.parent_post.reactions = newObj
      this.parent_post.rating = resp.post.rating
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
    heartIcon() {
      let user = this.setUserVar()
      if (!user || this.reactions.length <= 0) return 'mdi-heart'

      let userHasReacted = this.reactions.find(item => item.user.id === user.id)

      if (!userHasReacted) return 'mdi-heart'

      this.heartColor = 'red'
      if (userHasReacted.reaction == false) return 'mdi-heart-broken'

      this.heartClass = "me-1 bum-bum"
      return 'mdi-heart'
    }
  },
  mounted() {
    this.setData()
    this.setForm()
    this.loading = false
  },
}
</script>
<style>
.bum-bum {
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(0.85);
    }

    70% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(0.85);
    }
}
</style>