<template>
  <v-card-actions>
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-btn
        v-if="reacted"
        :loading="loading"
        color="orange"
        type="submit"
      >
        Me gusta
      </v-btn>
      <v-btn
        v-else
        :loading="loading"
        color="orange"
        type="submit"
      >
        No me gusta
      </v-btn>
    </v-form>
    <v-btn 
      color="orange"
      @click="focusInput()"
    >
      Comentar
    </v-btn>
  </v-card-actions>
</template>
<script>
import ReactionService from '@/services/ReactionService'
import Form from '../Common/Form.vue'

export default {
  extends: Form,
  props: {
    post_reactions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      apiService: ReactionService,
      form: {},
      reacted: false,
      itemId: null,
      preventUpdateItems: true,
      preventSnackbar: true,
    }
  },
  methods: {
    focusInput() {
      this.fireEvent('focus-comment-input')
    },
    userHasReacted() {
      if (!this.post_reactions) return

      let reaction = true
      let match = this.post_reactions.find(i => i.user.id === this.form.user_id)

      if (match) {
        reaction = !match.reaction
        this.itemId = match.id
      }

      return reaction
    },
    successCallBack(resp) {
      this.setForm()
      this.form.reaction = !this.reacted
      this.reacted = !this.reacted
      this.$nextTick(() => { this.fireEvent('update-rating-in-post', resp.post) })
    },
    setForm() {
      this.form.post_id = this.$route.params.id
      this.form.user_id = this.setUserVar().id
    }
  },
  mounted() {
    this.setForm()
    this.form.reaction = this.userHasReacted()
    this.reacted = this.userHasReacted()  
  },
}
</script>