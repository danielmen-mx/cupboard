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
        :label="translate('comments.add')"
        variant="solo"
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
import { getModel } from '@/components/Common/Helpers/GetModel'

export default {
  extends: Form,
  mixins: [getModel],
  props: {
    model_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      apiService: CommentService,
      preventSnackbar: true,
      form: {
        model_type: null,
        model_id: null,
        user_id: null,
        comment: null
      },
    }
  },
  methods: {
    setProperties() {
      if (!this.model_id) this.form.model_id = this.$route.params.id
      if (this.model_id) this.form.model_id = this.model_id
      this.form.model_type = this.getModel()

      let user = store.getters['user']

      if (user) this.form.user_id = user.id
    },
    focusInput() {
      setTimeout(() => {
        document.getElementById("comment_component").scrollIntoView({ behavior: "smooth", block: "end" })
        this.$nextTick(() => { document.getElementById("comment_input").focus() })
      }, 1000)
    },
    successCallBack() {
      if (this.isPostAction) this.fireEvent("add-new-comment-length")
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
        //
      }
    },
    'form.comment': {
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