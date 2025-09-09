<template>
  <v-row justify="center">
    <v-parallax
      class="h-screen"
      lazy-src="../../public/logo/shadai-main.jpeg"
    >
      <v-dialog
        v-model="dialog"
        persistent
        width="500"
      >
        <v-card class="pa-2">
          <div class="grey lighten-2 mx-6 mt-2 shaddai-font font-size-main-title" primary-title>
            {{ translate("login.account-reset") }}
          </div>
          <v-card-text>
            <v-form ref="formRef">
              <v-text-field
                v-model="form.password"
                :label="translate('login.type-new-password')"
                :rules="[passwordRules]"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :disabled="loading"
                required
              ></v-text-field>
              <v-text-field
                v-model="confirmation"
                :label="translate('login.confirm-password')"
                :rules="[v => !!v || translate('form.required'), matchPasswordConfirmation]"
                :type="showPassword ? 'text' : 'password'"
                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :disabled="loading"
                required
              ></v-text-field>
              <v-card-actions class="justify-space-around">
                <v-btn
                  variant="outlined"
                  color="success"
                  class="mr-4"
                  @click="submit"
                  :loading="loading"
                  :disabled="!canSubmit"
                >{{ translate("form.submit") }}</v-btn>
                <v-btn
                  variant="outlined"
                  color="error"
                  @click="closeForm"
                  :disabled="loading"
                >{{ translate("form.cancel") }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog> 
    </v-parallax>
  </v-row>
</template>
<script>
import Form from '../Common/Form.vue'
import AuthService from '../../services/AuthService'

const initialForm = () => ({
  token: null,
  email: null,
  password: null
})

export default {
  extends: Form,
  data: () => ({
    form: initialForm(),
    confirmation: '',
    showPassword: false,
    dialog: false,
    apiService: AuthService
  }),
  methods: {
    closeForm() {
      this.dialog = false
      this.form = initialForm()
      this.confirmation = ''
      this.$router.push({ path: '/login' })
    },
    matchPasswordConfirmation(value) {
      if (this.form.password && this.form.password !== value) return this.translate("login.validations.password")
      return true
    },
    passwordRules(value) {
      if (!value) return this.translate('form.required')
      if (value.length < 4) return this.translate('login.validations.password-length')
      return true
    },
    async submit() {
      const valid = this.$refs.formRef.validate()
      if (!valid) return
      console.log(this.form)

      try {
        this.loading = true
        const resp = await this.apiService.resetPassword(this.form)
        this.successSnackbar(resp.message)
        this.closeForm()
      } catch (error) {
        this.errorSnackbar(error.exception)
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.listenEvent(this.event, () => {
      this.confirmation = ''
    })

    this.$watch(
      () => this.$route.name, (name) => {
        if (name === 'reset-password') {
          this.dialog = true
          this.form.token = this.$route.query.token
          this.form.email = this.$route.query.email
          this.apiService = AuthService
        }
      }, { immediate: true }
    )
  },
  computed: {
    canSubmit() {
      return this.form.password &&
           this.confirmation &&
           this.form.password === this.confirmation
    }
  },
  // watch: {
  // '$route.name': {
  //     handler: function (name) {
  //       if (name == 'reset-password') this.dialog = true
  //     },
  //     deep: true,
  //     immediate: true
  //   }
  // },
}
</script>