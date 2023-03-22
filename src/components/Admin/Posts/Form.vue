<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="1024"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ title }}</span>
        </v-card-title>

        <v-form @submit.prevent="submit">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :disabled="waitResponse"
                  label="Nombre*"
                  hint="Escribe el nombre de tu publicación"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :disabled="waitResponse"
                  label="Autor*"
                  hint="Escribe el nombre del autor de la publicación"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :disabled="waitResponse"
                  label="Imagen"
                  hint="Subir imagen"
                  required
                ></v-text-field>
                <!-- <v-file-input
                  accept="image/*"
                  label="Subir imagen"
                  prepend-icon="mdi-camera"
                ></v-file-input> -->
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  :disabled="waitResponse"
                  label="Tags"
                  hint="Escribe el nombre del autor de la publicación"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <small>*Campos requeridos</small>
          </v-card-text>
            
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="waitResponse"
              color="warning"
              variant="text"
              @click="dialog = false"
            >
              Cerrar
            </v-btn>
            <v-btn
              :loading="waitResponse"
              color="success"
              variant="text"
              type="submit"
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
export default {
  data() {
    return {
      waitResponse: false,
      dialog: false,
      title: "Añadir nueva publicación",
      form: {
        name: null,
        autor: null,
        img: null,
        tags: [],
      }
    }
  },
  methods: {
    async submit() {
      try {
        this.waitResponse = true

        setTimeout(() => {
          console.log(this.form)
          this.emitter.emit('snackbarNotify', { color: 'success', message: 'waiting success'})
          this.waitResponse = false
          this.dialog = false
        }, 3000);

      } catch (error) {
        this.waitResponse = false
        this.emitter.emit('snackbarNotify', { color: 'error', message: 'waiting success'})
      }
    },
    openForm() {
      this.dialog = true
    }
  },
  mounted() {
    this.emitter.on('openPostForm', this.openForm)
  },
}
</script>