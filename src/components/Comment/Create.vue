<template>
  <div class="my-2 ml-1 mr-2">
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
        type="text"
        @click:append="submit"
      ></v-text-field>
      <v-btn
        :disabled="!formComplete"
        :loading="loading"
        class="elevation-0 ml-1"
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
    }
  },
  mounted() {
    this.setProperties()
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