<template></template>
<script>
import ReactionService from '@/services/ReactionService'
import Form from './Form.vue';
import { findItemById } from '../../utils/helpers';
import { isAuthenticated } from '../../utils/authentication'

export default {
  extends: Form,
  mixins: [findItemById],
  data() {
    return {
      reactions: {},
      model: {},
      modelType: null,
      form: {},
      itemId: null,
      heartColor: 'grey',
      heartClass: 'me-1',
      apiService: ReactionService,
      loading: true,
      preventSnackbar: true,
    }
  },
  methods: {
    getReactions() {
      this.reactions = this.model.reactions??{}
      this.setForm()
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
    validateLogin() {
      let logged = isAuthenticated()
      if (!logged) return this.$router.push({ path: '/login' })
      this.submit()
    },
    updateItems(resp) {
      let newObj = []
      let match = this.findItemById(this.reactions, resp.id)
      if (match) {
        newObj = this.reactions.map(function (reaction) {
          if (reaction.id === resp.id) return resp
          return reaction
        })
      } else {
        if (this.reactions.length >= 1) newObj = this.reactions
        newObj.push(resp)
      }
      this.reactions = newObj
    },
    setForm() {
      let user = this.setUserVar()
      this.form.model_type = this.modelType
      this.form.model_id = this.model.id
      this.form.user_id = !user ? null : user.id
      this.loading = false
      this.setReaction()
    },
    successCallBack(resp) {}
  },
  computed: {
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
    //
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