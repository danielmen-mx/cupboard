<template>
  <v-card class="mx-auto pa-2 ma-2 elevation-0 bg-grey-lighten-5">
    <template class="d-flex justify-space-between pa-2">
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <v-avatar
          color="blue-accent-2"
          size="24"
          v-text="step"
        ></v-avatar>
        <span class="pl-2">{{ currentTitle() }}</span>
      </v-card-title>
      <v-card-actions>
        <v-btn
          icon="mdi-close-circle-outline"
          @click="closeDrawer()"
        ></v-btn>
      </v-card-actions>
    </template>
    
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        v-if="step > 1"
        variant="text"
        @click="step--"
      >
        {{ translate("back") }}
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="step < 3"
        :disabled="!enableNextButton"
        color="blue-darken-3"
        variant="flat"
        @click="stepForward()"
      >
        {{ translate("next") }}
      </v-btn>
      <v-btn
        v-else
        :disabled="!enableSubmit"
        color="green"
        variant="flat"
        @click.prevent="submit"
      >
        {{ translate(submitButtonText) }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import PostService from '@/services/PostService'
import Form from '../../Common/Form.vue'
import required from '../../Common/Form.vue'
import TextEditor from '../../Common/TextEditor.vue'
import { copyData, slugify, removeHTMLTags } from '../../../utils/helpers'
import { imageHeaders } from '../../../services/api'

export default {
  extends: {
    Form
  },
  mixins: [required, copyData, slugify, imageHeaders, removeHTMLTags],
  components: {
    TextEditor
  },
  props: {
    item_parent: {
      type: Object,
      required: false,
    }
  },
  data() {
    return {
      apiService: PostService,
      step: 1,
      enableNextButton: false,
      enableSubmit: false,
      submitButtonText: 'create',
      form: {
        name: null,
        autor: null,
        description: null,
        image: null,
        tags: []
      },
      itemId: null,
      loading: false,
      imageStored: null,
      search: null,
      base_tags: [
        this.translate("admin.posts.tag-list.release"),
        this.translate("admin.posts.tag-list.update"),
        this.translate("admin.posts.tag-list.overwrite")
      ],
      event: 'updatePostAdminTable'
    }
  },
  methods: {
    currentTitle() {
      switch (this.step) {
        case 1: return this.translate("basic_information")
        case 2: return this.translate("autor_information")
        default: return 'Preview'
      }
    },
    stepForward() {
      this.step++
      this.enableNextButton = false
    },
    validateDescription() {
      if (this.validateStepOne()) return this.enableNextButton = true
      return this.enableNextButton = false
    },
    async submit() {
      if (!this.validateStepOne() || !this.validateStepTwo()) return

      try {
        this.loading = true

        let resp = null
        if (!this.itemId) {
          resp = await this.apiService.store(this.form)
        } else {
          let headers = this.getHeaders()
          this.form._method = "PUT"
          resp = await this.apiService.update(this.itemId, this.form, headers)
        }

        this.loading = false

        this.$nextTick(() => {
          this.closeDrawer()
          this.successSnackbar(resp.message)
          this.fireEvent(this.event, resp.data)
        })
      } catch (error) {
        console.log(error)
        this.loading = false
        this.$nextTick(() => {
          this.errorSnackbar(error.response.data.message)
        })
      }
    },
    addFile(e) {
      this.form.image = e.target.files[0]
      this.imageStored = !this.form.image ? null : this.form.image.name
    },
    getFileInputLabel() {
      if (this.imageStored) return this.imageStored
      if (!this.form.image) return this.translate("admin.posts.upload-asset")
      return this.form.image.name
    },
    getImageName(imageName) {
      if (!imageName) return

      let split = imageName.split('/')
      return split[split.length - 1]
    },
    getHeaders() {
      if (this.form.image instanceof File) return this.imageHeaders()
      return null
    },
    answeredForm(formTarget) {
      if (formTarget && formTarget.length > 1 && formTarget !== '') return true
      return false
    },
    validateStepOne() {
      let description = this.removeHTMLTags(this.form.description)?.trim()
      if (this.answeredForm(this.form.name) && this.answeredForm(description)) return true
      return false
    },
    validateStepTwo() {
      if (this.answeredForm(this.form.autor)) return true
      return false
    },
    closeDrawer() {
      this.step = 1
      this.submitButtonText = 'create'
      this.itemId = null,
      this.imageStored = null
      this.form = {
        name: null,
        description: null,
        autor: null,
        image: null,
        tags: null
      }

      this.$nextTick(() => { this.$router.push({ path: "/admin/users" }) })
    }
  },
  mounted() {
    if (!this.item_parent) return
    let itemBackup = this.copyData(this.item_parent)
    this.submitButtonText = 'update'
    this.itemId = itemBackup.id
    this.imageStored = !itemBackup.image ? null : this.getImageName(itemBackup.image)
    this.form = itemBackup
  },
  watch: {
    'form.name': {
      handler: function () {
        if (this.validateStepOne()) return this.enableNextButton = true
        return this.enableNextButton = false
      },
      deep: true,
      immediate: true
    },
    'form.autor': {
      handler: function () {
        if (this.validateStepTwo()) return this.enableNextButton = true
        return this.enableNextButton = false
      }
    },
    'step': {
      handler: function () {
        if (this.step === 1) return this.validateStepOne() ? this.enableNextButton = true : this.enableNextButton = false
        if (this.step === 2) return this.validateStepTwo() ? this.enableNextButton = true : this.enableNextButton = false
        if (this.step === 3) return this.validateStepOne() && this.validateStepTwo() ? this.enableSubmit = true : this.enableSubmit = false
      },
      deep: true,
      immediate: true
    },
  }
}
</script>