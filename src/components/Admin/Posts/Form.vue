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
          @submit.prevent
        >
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :disabled="waitResponse"
                  v-model="form.name"
                  label="Titulo*"
                  hint="Escribe el nombre de tu publicación"
                  :rules="[required]"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :disabled="waitResponse"
                  v-model="form.autor"
                  label="Autor*"
                  hint="Escribe el nombre del autor de la publicación"
                  :rules="[required]"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-file-input
                  v-if="!form.image"
                  :disabled="waitResponse"
                  label="Subir imagen"
                  prepend-icon="mdi-camera"
                ></v-file-input>
                <!-- different if the posts contain a file updated previously -->
                <v-file-input
                  v-else
                  :disabled="waitResponse"
                  
                  label="Subir imagen"
                  prepend-icon="mdi-camera"
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :disabled="waitResponse"
                  v-model="form.tags"
                  label="Tags"
                  hint="Escribe el nombre del autor de la publicación"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>

            <small>*Campos requeridos</small>
          </v-card-text>
            
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!formComplete"
              :loading="waitResponse"
              color="success"
              size="large"
              variant="text"
              @click="submit()"
            >
              Crear
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import PostService from '@/services/PostService'

export default {
  data() {
    return {
      apiService: PostService,
      formComplete: false,
      waitResponse: false,
      dialog: false,
      title: "Añadir nueva publicación",
      form: {
        name: null,
        autor: null,
        image: null,
        tags: [],
      }
    }
  },
  methods: {
    async submit() {
      try {
        this.waitResponse = true

        const resp = await this.apiService.store(this.form)

        this.emitter.emit('snackbarNotify', { color: 'success', message: resp.data.message})
        this.waitResponse = false

        this.$nextTick(() => {
          this.closeForm()
          this.emitter.emit('updateTable')
        })
      } catch (error) {
        console.log(error)
        this.waitResponse = false
        this.emitter.emit('snackbarNotify', { color: 'error', message: error.response.data.message})
      }
    },
    openForm(data) {
      this.dialog = true
      if (data == null) return
      this.form = data
      console.log()
    },
    closeForm() {
      this.form = {
        name: null,
        autor: null,
        image: null,
        tags: [],
      }
      this.dialog = false
    },
    required (v) {
      return !!v || 'Campo requerido'
    },
  },
  mounted() {
    this.emitter.on('openPostForm', this.openForm)
  },
}
</script>