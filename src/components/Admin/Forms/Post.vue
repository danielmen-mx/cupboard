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
    <v-window v-model="step">
      <!-- Step One -->
      <v-window-item :value="1">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12" class="mb-2">
              <v-text-field
                :loading="loading"
                v-model="form.name"
                density="compact"
                :rules="[required]"
                :label="translate('admin.posts.title')+'*'"
                :hint="translate('admin.posts.guides.title')"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>

          <quill-editor
            v-model:content="form.description"
            contentType="html"
            :placeholder="translate('admin.posts.guides.description')+'*'"
            style="height: 180px;"
            class="mb-4"
            theme="snow"
            @keyup="validateDescription"
          ></quill-editor>

          <v-row>
            <v-col cols="12" sm="6">
              <v-file-input
                prepend-icon="mdi-camera"
                accept="image/*"
                density="compact"
                show-size
                counter
                @change="addFile"
                :loading="loading"
                :label="getFileInputLabel()"
              >
                <!-- <template v-if="imageStored" #prepend-inner>
                  {{ imageStored }}
                </template> -->
              </v-file-input>
            </v-col>
            <v-col cols="12" sm="6">
              <v-combobox
                v-model="form.tags"
                v-model:search="search"
                :hide-no-data="false"
                :items="base_tags"
                density="compact"
                hide-selected
                :hint="translate('admin.posts.guides.tags')"
                :label="translate('admin.posts.add-tags')"
                multiple
                persistent-hint
                chips
              >
                <template v-slot:no-data>
                  <v-list-item>
                    <v-list-item-title>
                      {{ translate("admin.posts.guides.new-tags-1") }} <kbd>{{ translate("enter") }}</kbd> {{ translate("admin.posts.guides.new-tags-2") }}
                    </v-list-item-title>
                  </v-list-item>
                </template>
              </v-combobox>
            </v-col>
          </v-row>

          <small>*{{ translate("validations.required-fields") }}</small>
        </v-card-text>
      </v-window-item>

      <!-- Step Two -->
      <v-window-item :value="2">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field
                :loading="loading"
                v-model="form.autor"
                density="compact"
                :rules="[required]"
                :label="translate('admin.posts.autor')+'*'"
                :hint="translate('admin.posts.guides.autor')"
                clearable
              ></v-text-field>
            </v-col>
          </v-row>

          <small>*{{ translate("validations.required-fields") }}</small>
        </v-card-text>
      </v-window-item>

      <!-- Step three -->
      <v-window-item :value="3">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :disabled="true"
              v-model="form.name"
              :label="translate('admin.posts.title')+'*'"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :disabled="true"
              v-model="form.autor"
              :label="translate('admin.posts.autor')+'*'"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          :disabled="true"
          v-model="form.description"
          :label="translate('admin.posts.description')"
          density="compact"
        ></v-text-field>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              :disabled="true"
              prepend-icon="mdi-camera"
              show-size
              counter
              density="compact"
              :label="getFileInputLabel()"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :disabled="true"
              v-model="form.tags"
              :label="translate('admin.posts.add-tags')"
              density="compact"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
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

      this.$nextTick(() => { this.$router.push({ path: "/admin/posts" }) })
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