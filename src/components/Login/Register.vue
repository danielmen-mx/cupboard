<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card class="pa-4">
        <div class="shaddai-font font-size-lg text-center">
          {{ translate("login.create") }}
        </div>
        <v-form
          v-model="formComplete"
          @submit.prevent="submit"
          ref="form"
        >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  :label="translate('email')+'*'"
                  type="email"
                  :readonly="loading"
                  :rules="[required, email]"
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.password"
                  :label="translate('password')+'*'"
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
                  :label="translate('login.password-confirmation')+'*'"
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
            <small>*{{ translate("login.required") }}</small>
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
              {{ translate("login.create") }}
            </v-btn>
            <p
              class="cursor-pointer text-light-green mt-2 text-decoration-underline text-center"
              @click="closeForm()"
            >
              {{ translate("login.account-created") }}
            </p>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Form from '../Common/Form.vue'
import AuthService from '../../services/AuthService'

export default {
  extends: Form,
  data: () => ({
    form: {},
    confirmation: '',
    dialog: false,
    apiService: AuthService
  }),
  methods: {
    closeForm() {
      this.$router.push({ path: '/login' })
      this.dialog = false
      this.form = {}
      this.confirmation = ''
    },
    matchPassword(v) {
      if (this.form.password) {
        if (this.form.password !== v) return this.translate("login.validations.password")
      }
    },
    async submit() {
      if (!this.form) return

      try {
        this.loading = true
        const resp = await this.apiService.register(this.form)

        this.$nextTick(() => {
          this.successSnackbar(resp.message)
          this.formComplete = false
          this.loading = false
          this.closeForm()
        })
      } catch (error) {
        console.log(error)
        this.formComplete = false
        this.errorSnackbar(error.exception)
        this.loading = false
      }
    },
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