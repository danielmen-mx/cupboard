<template>
  <div class="mx-2 mt-4" id="comment_component">
    <v-form
      v-model="formComplete"
      ref="form"
      @submit.prevent="submit"
      class="d-flex"
    >
      <v-text-field
        v-model="form.comment"
        :rules="[required]"
        :disabled="loading"
        clear-icon="mdi-close-circle"
        clearable
        label="Añadir comentario"
        variant="outlined"
        id="comment_input"
        type="text"
        @click:append="submit"
      ></v-text-field>
      <v-btn
        :disabled="!formComplete"
        :loading="loading"
        class="elevation-0"
        height="55"
        type="submit"
        variant="plain"
      >
        <v-icon>
          mdi-send
        </v-icon>
      </v-btn>
    </v-form>
  </div>
</template>
<script>
import Form from '../Common/Form.vue'
import CommentService from '@/services/CommentService'
import store from '../../store'
import { nextTick } from 'vue'

export default {
  extends: Form,
  props: {
    post_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiService: CommentService,
      preventSnackbar: true,
      form: {
        post_id: null,
        user_id: null
      },
    }
  },
  methods: {
    setProperties() {
      if (!this.post_id) this.form.post_id = this.$route.params.id
      if (this.post_id) this.form.post_id = this.post_id

      let user = store.getters['user']

      if (user) {
        this.form.user_id = user.id
      }
    },
    focusInput() {
      setTimeout(() => {
        // this.$refs.comment_component.scrollIntoView({ behavior: "smooth", block: "end" })
        document.getElementById("comment_component").scrollIntoView({ behavior: "smooth", block: "end" })
        this.$nextTick(() => {
          // this.$refs.comment_input.focus()
          document.getElementById("comment_input").focus()
        })
      }, 1000)
    }
  },
  mounted() {
    this.setProperties()
    this.listenEvent('focus-comment-input', this.focusInput)
  },
  beforeDestroy() {
    this.unlistenEvent('focus-comment-input', this.focusInput)
  },
  watch: {
    'formComplete': {
      handler: function () {
        if (this.form.comment !== null || this.form.comment !== '') {
          this.setProperties()
          this.formComplete = true
        }
      }
    }
  }
}
</script>