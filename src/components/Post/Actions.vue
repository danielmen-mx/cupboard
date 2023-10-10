<template>
  <v-card-actions >
    <v-form
      ref="form"
      @submit.prevent="submit"
    >
      <v-btn
        v-if="!reacted"
        :loading="loading"
        color="orange"
        type="submit"
      >
        {{ translate("actions.like") }}
      </v-btn>
      <v-btn
        v-else
        :loading="loading"
        color="orange"
        type="submit"
      >
        {{ translate("actions.dont-like") }}
      </v-btn>
    </v-form>
    <v-btn 
      color="orange"
      @click="focusInput()"
    >
      {{ translate("actions.comment") }}
    </v-btn>
  </v-card-actions>
</template>
<script>
import { findItemById } from '../../utils/helpers'
import { getModel } from '../Common/Helpers/GetModel'
import ReactionService from '@/services/ReactionService'
import Form from '../Common/Form.vue'

export default {
  extends: Form,
  mixins: [findItemById, getModel],
  props: {
    model_reactions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      apiService: ReactionService,
      reactions: {},
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
    setData() {
      if (this.reactions.length <= 0) return this.reacted = false

      let match = this.reactions.find(item => item.user.id === this.form.user_id)

      if (!match) return

      this.setReaction(match)
    },
    updateReactions(resp) {
      if (this.reactions <= 0) {
        this.reactions[0] = resp
        this.setReaction(resp)
        return
      }

      let match = this.findItemById(this.reactions, resp.id)

      if (!match) {
        this.reactions.push(resp)
        this.setReaction(resp)
        return
      }

      let reactionsUpdated = this.reactions.map(function (reaction) {
        if (reaction.id === resp.id) {
          return resp
        }

        return reaction
      })

      this.reactions = reactionsUpdated
      this.setReaction(resp)
    },
    setReaction(react) {
      this.itemId = react.id
      this.reacted = react.reaction
      this.form.reaction = !react.reaction
    },
    successCallBack(resp) {
      this.setForm()
      this.$nextTick(() => { this.fireEvent('update-reaction-rating', resp) })
      this.updateReactions(resp)
    },
    setForm() {
      this.reactions = this.model_reactions
      this.form.user_id = this.setUserVar().id
      this.form.model_type = this.getModel()
      this.form.model_id = this.$route.params.id
      this.form.reaction = true
    }
  },
  mounted() {
    this.setForm()
    this.setData()
  },
}
</script>