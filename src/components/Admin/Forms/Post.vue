<template>
  <v-card color="transparent elevation-0 pa-2">
    <!-- <v-form
      v-model="formComplete"
      ref="form"
    > -->
      <v-window v-model="step">
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
              <!--  -->
            </v-row>

            <quill-editor
              v-model:content="form.description"
              contentType="html"
              :placeholder="translate('admin.posts.guides.description')+'*'"
              style="height: 180px;"
              class="mb-4"
              theme="snow"
              @keyup="checkFormComplete()"
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
                  <!-- <template v-if="image_stored" #prepend-inner>
                    {{ image_stored.name }}
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
                v-model="image_stored.name"
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
                v-model="form.autor"
                :label="translate('admin.posts.add-tags')"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    <!-- </v-form> -->
  </v-card>
</template>
<script>
import required from '../../Common/Form.vue'
import TextEditor from '../../Common/TextEditor.vue'
import { copyData, slugify } from '../../../utils/helpers'
import { imageHeaders } from '../../../services/api'

export default {
  extends: {
    //
  },
  mixins: [required, copyData, slugify, imageHeaders],
  components: {
    TextEditor
  },
  props: {
    current_step: {
      type: Number,
      required: true
    },
    // form_parent: {
    //   type: Object,
    //   required: true
    // }
  },
  data() {
    return {
      step: null,
      enableNextButton: false,
      form: {},
      formComplete: false,
      loading: false,
      image_stored: null,
      search: null,
      base_tags: [
        this.translate("admin.posts.tag-list.release"),
        this.translate("admin.posts.tag-list.update"),
        this.translate("admin.posts.tag-list.overwrite")
      ],
    }
  },
  methods: {
    emitSubmit() {
      this.$emit('enable_submit')
    },
    addFile(e) {
      this.form.image = e.target.files[0]
      this.image_stored = !this.form.image ? null : this.form.image
      // if (!this.image_stored) return
      if (this.image_stored) return
      this.image_stored = null
    },
    getFileInputLabel() {
      if (!this.image_stored) return this.translate("admin.posts.upload-asset")
      return ''
    },
    getHeaders() {
      if (this.form.image instanceof File) return this.imageHeaders()
      return null
    },
    checkFormComplete() {
      if (this.form.name && this.form.autor && this.form.description) {
        this.unlock = true
      }
    },
    answeredForm(formTarget) {
      if (formTarget && formTarget.length > 1 && formTarget !== '') return true
      return false
    },
    validateStepOne() {
      if (this.step !== 1) return
      if (this.answeredForm(this.form.name) && this.answeredForm(this.form.description)) return true
      return false
    }
  },
  mounted() {
    this.step = this.current_step
  },
  watch: {
    'form.name': {
      handler: function () {
        console.log('form.name: ', this.form.name)
        if (this.validateStepOne()) return this.$emit('enable_next_button', true)
        return this.$emit('enable_next_button', false)
      },
      deep: true,
      immediate: true
    },
    'form.description': {
      handler: function () {
        console.log('form.description: ', this.form.description)
        if (this.validateStepOne()) return this.$emit('enable_next_button', true)
        return this.$emit('enable_next_button', false)
      },
      deep: true,
      immediate: true
    },
    'current_step': {
      handler: function () {
        this.step = this.current_step
        if (this.step === 1) return this.validateStepOne() ? this.$emit('enable_next_button', true) : this.$emit('enable_next_button', false)
      },
      deep: true,
      immediate: true
    }
  }
}
</script>