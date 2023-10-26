<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <v-card>
        <div class="d-flex justify-space-between pa-2">
          <v-card-title>
            <span class="text-h5">{{ translate(title) }}</span>
          </v-card-title>
          <v-card-actions>
            <v-btn
              icon="mdi-close-circle-outline"
              @click="closeForm()"
            ></v-btn>
          </v-card-actions>
        </div>
        <v-form
          v-model="formComplete"
          ref="form"
          @submit.prevent="submit"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :loading="waitResponse"
                  v-model="form.name"
                  :rules="[required]"
                  :label="translate('admin.posts.title')+'*'"
                  :hint="translate('admin.posts.guides.title')"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :loading="waitResponse"
                  v-model="form.autor"
                  :rules="[required]"
                  :label="translate('admin.posts.autor')+'*'"
                  :hint="translate('admin.posts.guides.autor')"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <quill-editor
              v-model:content="form.description"
              contentType="html"
              :placeholder="translate('admin.posts.guides.description')"
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
                  show-size
                  counter
                  @change="addFile"
                  :loading="waitResponse"
                  :label="getFileInputLabel()"
                >
                  <template v-if="image_stored" #prepend-inner>
                    {{ image_stored }}
                  </template>
                </v-file-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="form.tags"
                  v-model:search="search"
                  :hide-no-data="false"
                  :items="base_tags"
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

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!unlock"
              :loading="waitResponse"
              color="success"
              size="large"
              variant="text"
              type="submit"
            >
              {{ translate(btn_text) }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import PostService from '@/services/PostService'
import TextEditor from '../../Common/TextEditor.vue'
import { copyData, slugify } from '../../../utils/helpers'
import { imageHeaders } from '../../../services/api'

export default {
  mixins: [copyData, slugify, imageHeaders],
  components: {
    TextEditor
  },
  props: {
    item: {
      type: Object,
      required: false
    },
    functionFileName: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      apiService: PostService,
      formComplete: false,
      unlock: false,
      waitResponse: false,
      dialog: false,
      title: "admin.posts.add",
      btn_text: "create",
      item_id: null,
      backup: {},
      form: {
        name: null,
        autor: null,
        description: null,
        image: null,
        tags: [],
      },
      image_stored: null,
      base_tags: [
        this.translate("admin.posts.tag-list.release"),
        this.translate("admin.posts.tag-list.update"),
        this.translate("admin.posts.tag-list.overwrite")
      ],
      search: null,
      event: 'updateAdminTable'
    }
  },
  methods: {
    addFile(e) {
      this.form.image = e.target.files[0]

      if (!this.image_stored) return
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
    async submit() {
      if (!this.form.name || !this.form.autor || !this.form.description) return

      try {
        this.waitResponse = true

        let resp = null
        if (!this.item_id) {
          resp = await this.apiService.store(this.form)
        } else {
          let headers = this.getHeaders()
          this.form._method = "PUT"
          resp = await this.apiService.update(this.item_id, this.form, headers)
        }

        this.waitResponse = false

        this.$nextTick(() => {
          this.closeForm()
          this.successSnackbar(resp.data.message)
          this.fireEvent(this.event)
        })
      } catch (error) {
        console.log(error)
        this.waitResponse = false
        this.$nextTick(() => {
          this.errorSnackbar(error.response.data.message)
        })
      }
    },
    openForm(data) {
      this.dialog = true
      if (!data) return
      let updateItem = this.copyData(data)
      this.updateTitles('edition')
      this.item_id = updateItem.id
      this.image_stored = !updateItem.image ? updateItem.image : this.functionFileName(updateItem.image, updateItem.name)
      this.form = updateItem
    },
    closeForm() {
      this.$nextTick(() => { this.dialog = false })

      this.form = {
        name: null,
        price: null,
        shipping_price: null,
        quantity: null,
        description: null,
        image: null,
      }

      if (!this.item_id) return
      this.updateTitles('close')
    },
    updateTitles(action) {
      if (action == 'edition') {
        this.title = "admin.posts.edit"
        this.btn_text = "update"
      } else {
        this.title = "admin.posts.add"
        this.btn_text = "create"
        this.item_id = null
        this.image_stored = null
      }
    },
    required (v) {
      return !!v || this.translate("form.validations.require-field")
    },
    checkFormComplete() {
      if (this.form.name && this.form.autor && this.form.description) {
        this.unlock = true
      }
    }
  },
  mounted() {
    this.listenEvent('openProductForm', this.openForm)
  },
  watch: {
    model (val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop())
      }
    },
    'formComplete': {
      handler: function () {
        this.checkFormComplete()
      }
    }
  },
}
</script>