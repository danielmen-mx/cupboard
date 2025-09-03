<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
    >
      <v-card class="pa-4">
        <div class="d-flex justify-space-between align-center mb-4 mx-2">
          <v-card-title class="text-h5 grey lighten-2">
            {{ translate("login.account-recover") }}
          </v-card-title>
          <v-card-actions>
            <v-btn
            @click="closeForm()"
            icon="mdi-close-circle-outline"
            class="ma-0 pa-0"
            :ripple="false"
            plain
            ></v-btn>
          </v-card-actions>
        </div>
        <v-card-text>
          <v-form
            ref="form"
            v-model="formComplete"
            lazy-validation
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="form.email"
              :label="translate('login.recover-email')"
              :rules="[ v => !!v || translate('form.validations.require-field'), v => /.+@.+\..+/.test(v) || translate('login.validations.email') ]"
              :disabled="loading"
              clearable
              required
            ></v-text-field>
            <v-btn
              :class="formComplete ? 'shiny-text' : ''"
              :disabled="!formComplete || loading"
              color="success"
              type="submit"
              block
              large
              variant="elevated"
              class="mt-2"
            >{{ translate("login.request-recover") }}</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

  </v-row>
</template>
<script>
import Form from '../Common/Form.vue';
import AuthService from '../../services/AuthService';

export default {
  extends: Form,
  data() {
    return {
      dialog: false,
      confirmation: '',
      apiService: AuthService,
      form: { email: '' },
      event: 'recover-account'
    }
  },
  methods: {
    closeForm() {
      this.$router.push({ path: '/login' })
      this.dialog = false
      this.form = {}
      this.confirmation = ''
    },
    async submit() {
      if (!this.form) return

      try {
        this.loading = true
        let resp = null
        resp = await this.apiService.forgotPassword(this.form)

        if (!this.preventSnackbar) {
          this.successSnackbar(resp.message)
        }

        if (!this.preventUpdateItems) {
          this.fireEvent(this.event, resp.data)
        }

        this.dialog = false
        this.form = {}
        this.successCallBack(resp.data)
        // console.log(resp) // test purposes
      } catch (error) {
        console.log(error)
        if (error.exception) this.errorSnackbar(error.exception)
      }

      this.loading = false
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
        if (params.register == 'recover') this.dialog = true
      },
      deep: true,
      immediate: true
    }
  },
}
</script>