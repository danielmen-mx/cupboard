<template>
  <v-form
    class="elevation-0 d-flex bg-grey-lighten-4 rounded-xl my-1 mx-1"
    v-model="formComplete"
    ref="form"
    @submit.prevent="submit"
  >
    <template class="d-flex align-start pa-3">
      <v-avatar color="blue-darken-3" >
        <span class="text-h6">{{ initials(comment.user.fullname??comment.user.username) }}</span>
      </v-avatar>
    </template>

    <v-card-text class="pa-2">
      <div class="text-subtitle-2 text-decoration-underline" >
        <strong>{{ ucFirst(comment.user.fullname??comment.user.username) }}</strong>
      </div>
      <v-text-field
        v-model="form.comment"
        :disabled="loading"
        class="text-subtitle-1"
        variant="underlined"
      >
        <template v-slot:append-inner>
          <v-fade-transition leave-absolute>
            <v-progress-circular
              v-if="loading"
              color="info"
              indeterminate
              size="24"
            ></v-progress-circular>
          </v-fade-transition>
        </template>
      </v-text-field>
    </v-card-text>
    <div class="mt-auto mr-4 mb-1" >
      <v-btn
        :disabled="loading"
        size="x-small"
        :ripple="false"
        variant="plain"
        class="text-decoration-underline"
        type="submit"
      >
        {{ translate("update") }}
      </v-btn>
      <v-btn
        :disabled="loading"
        size="x-small"
        :ripple="false"
        variant="plain"
        class="text-decoration-underline"
        @click="cancel()"
      >
        {{ translate("cancel") }}
      </v-btn>
    </div>
  </v-form>
</template>
<script>
import { initials, ucFirst } from '../../utils/helpers'
import { getModel } from '../Common/Helpers/GetModel'
import Form from '../Common/Form.vue'
import CommentService from '@/services/CommentService'

export default {
  extends: Form,
  mixins: [initials, ucFirst, getModel],
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      form: {},
      apiService: CommentService,
      itemId: null,
      preventSnackbar: true,
    }
  },
  methods: {
    cancel() {
      this.comment.editing = false
    },
    setProperties() {
      this.itemId = this.comment.id
      this.form.model_type = this.getModel()
      if (!this.model_id) this.form.model_id = this.$route.params.id
      if (this.model_id) this.form.model_id = this.model_id
      this.form.user_id = this.comment.user.id
      this.form.comment = this.comment.comment
    }
  },
  mounted() {
    this.setProperties()
  },
}
</script>