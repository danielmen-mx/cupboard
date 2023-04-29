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
            <span class="text-h5">{{ title }}</span>
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
          @submit.prevent
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :loading="waitResponse"
                  v-model="form.name"
                  :rules="[required]"
                  label="Titulo*"
                  hint="Escribe el nombre de tu publicación"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :loading="waitResponse"
                  v-model="form.autor"
                  :rules="[required]"
                  label="Autor*"
                  hint="Escribe el nombre del autor de la publicación"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-textarea
              :loading="waitResponse"
              v-model="form.description"
              :rules="[required]"
              label="Contenido"
              hint="Escribe un poco sobre el tema de la publicación"
              clearable
            ></v-textarea>
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
                <!-- <v-file-input
                  accept="image/*"
                  show-size
                  counter
                  :loading="waitResponse"
                  @change="onChange"
                  :label="getFileInputLabel()"
                  prepend-icon="mdi-camera"
                >
                  <template v-if="image_stored" #prepend-inner>
                    {{ image_stored }}
                  </template>
                </v-file-input> -->
              </v-col>
              <v-col cols="12" sm="6">
                <v-combobox
                  v-model="form.tags"
                  v-model:search="search"
                  :hide-no-data="false"
                  :items="base_tags"
                  hide-selected
                  hint="Añade etiquetas que concuerden con el post"
                  label="Añadir etiquetas"
                  multiple
                  persistent-hint
                  chips
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Escriba su etiqueta y presione <kbd>enter</kbd> para crear una nueva
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                </v-combobox>
              </v-col>
            </v-row>

            <small>*Campos requeridos</small>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!unlock"
              :loading="waitResponse"
              color="success"
              size="large"
              variant="text"
              @click="submit()"
            >
              {{ btn_text }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import PostService from '@/services/PostService'
import { copyData, slugify } from '../../../utils/helpers'
import { imageHeaders } from '../../../services/api'

export default {
  mixins: [copyData, slugify, imageHeaders],
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
      title: "Añadir nueva publicación",
      btn_text: "Crear",
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
        'New release',
        'Update post',
        'Overwrite post'
      ],
      search: null,
      event: 'updateTable'
    }
  },
  methods: {
    addFile(e) {
      this.form.image = e.target.files[0]

      if (!this.image_stored) return
      this.image_stored = null
    },
    getFileInputLabel() {
      if (!this.image_stored) return "Subir imagen"
      return ''
    },
    getHeaders() {
      if (this.form.image instanceof File) return this.imageHeaders()
      return null
    },
    async submit() {
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
      // this.dialog = false

      this.form = {
        name: null,
        autor: null,
        description: null,
        image: null,
        tags: null
      }

      if (!this.item_id) return
      this.updateTitles('close')
    },
    updateTitles(action) {
      if (action == 'edition') {
        this.title = "Editar publicación"
        this.btn_text = "Actualizar"
      } else {
        this.title = "Añadir nueva publicación"
        this.btn_text = "Crear"
        this.item_id = null
        this.image_stored = null
      }
    },
    required (v) {
      return !!v || 'Campo requerido'
    }
  },
  mounted() {
    this.listenEvent('openPostForm', this.openForm)
  },
  watch: {
    model (val) {
      if (val.length > 5) {
        this.$nextTick(() => this.model.pop())
      }
    },
    'formComplete': {
      handler: function () {
        if (this.form.name && this.form.autor && this.form.description) {
          this.unlock = true
        }
      }
    }
  },
}
</script>