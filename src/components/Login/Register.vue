<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card class="pa-4">
        <div class="satisfy-font font-size-lg text-center">
          Crear Cuenta
        </div>
        <v-form
          v-model="formComplete"
          @submit.prevent="submit" 
        >

          <!-- Form -->
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="Email*"
                  type="email"
                  :readonly="loading"
                  :rules="[required, email]"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  label="Contraseña*"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append-inner="show = !show"
                  :readonly="loading"
                  :rules="[required]"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Repita contraseña*"
                  v-model="confirmation"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append-inner="show = !show"
                  :readonly="loading"
                  :rules="[matchPassword]"
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
            <small>*Campos obligatorios</small>
          </v-card-text>

          <!-- Button -->
          <div class="mx-4 my-4">
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!formComplete"
              :loading="loading"
              block
              color="success"
              size="large"
              type="submit"
              variant="elevated"
            >
              Crear cuenta
            </v-btn>
            <p
              class="cursor-pointer text-light-green mt-2 text-decoration-underline text-center"
              @click="closeForm()"
            >
              Ya tengo una cuenta
            </p>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Form from '../Common/Form.vue'

export default {
  extends: Form,
  data: () => ({
    form: {},
    confirmation: '',
    dialog: false,
  }),
  methods: {
    closeForm() {
      this.$router.push({ path: '/login' })
      this.dialog = false
    },
    matchPassword(v) {
      if (!this.form.password) return
      if (this.form.password !== v) return 'Tus contraseñas no son las mismas'
    }
  },
  mounted() {
    this.listenEvent(this.event, () => {
      this.confirmation = ''
    })
  },
  watch: {
  '$route.params': {
      handler: function (params) {
        if (params.register == 'register') this.dialog = true
      },
      deep: true,
      immediate: true
    }
  },
}
</script>