<template>
  <div>
    <v-dialog
      v-model="visible"
      width="auto"
      persistent
    >
      <v-card class="pa-5">
        <v-form>
          <span class="d-flex justify-center satisfy-font font-size-md pt-2 pb-4">
            {{ translate("user-settings.change-password") }}
          </span>
            <v-row class="d-flex justify-center">
              <v-col cols="11">
                <v-text-field
                  v-model="form.password"
                  :label="translate('password')+'*'"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append-inner="show = !show"
                  :readonly="loading"
                  :rules="[required]"
                  variant="solo"
                  density="compact"
                  single-line
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="11">
                <v-text-field
                  :label="translate('login.password-confirmation')+'*'"
                  v-model="confirmation"
                  :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append-inner="show = !show"
                  :readonly="loading"
                  :rules="[matchPassword]"
                  variant="solo"
                  density="compact"
                  single-line
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>

          <v-card-actions class="d-flex justify-center ">
            <v-btn
              :disabled="loading"
              color="red"
              size="small"
              variant="outlined"
              width="10vw"
              @click="resetValues"
            >{{ translate("cancel") }}</v-btn>
            <v-btn
              :disabled="loading || !enableSubmitBtn"
              color="green"
              size="small"
              variant="outlined"
              width="10vw"
              @click="submit"
            >{{ translate("accept") }}</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import translate from '../../plugins/locales';
import UserService from '../../services/UserService';
import Form from './Form.vue';

export default {
  extends: Form,
  data () {
    return {
      visible: false,
      apiService: UserService,
      itemId: null,
      item: null,
      form: {},
      confirmation: '',
      enableSubmitBtn: false,
      event: null,
    }
  },
  methods: {
    resetValues() {
      this.visible = false
      this.form = {}
      this.confirmation = ''
    },
    matchPassword(v) {
      if (!this.form.password) return
      if (this.form.password !== v) return this.translate("login.validations.password")
    },
    async submit() {
      if (!this.form) return

      try {
        this.loading = true
        const resp = await this.apiService.changePassword(this.itemId, this.form)

        this.$nextTick(() => {
          this.successSnackbar(resp.message)
          this.loading = false
          this.resetValues()
        })
      } catch (error) {
        console.log(error)
        this.errorSnackbar(error.exception)
        this.loading = false
      }
    },
    handle(data) {
      this.itemId = data.id
      this.item = data.item
      setTimeout(() => { this.visible = true }, 100);
    },
    successCallBack() {
      this.fireEvent(this.event)
    },
    validatefields(currentEntry, sisterEntry) {
      if (!currentEntry || currentEntry == "" || !sisterEntry || sisterEntry == "") return this.enableSubmitBtn = false
      if (currentEntry !== sisterEntry) return this.enableSubmitBtn = false
      return this.enableSubmitBtn = true
    }
  },
  computed: {
    //
  },
  mounted() {
    this.listenEvent("change-password-dialog", this.handle)
  },
  watch: {
    'form.password': {
      handler: function() {
        this.validatefields(this.form.password, this.confirmation)
      }
    },
    'confirmation': {
      handler: function() {
        this.validatefields(this.confirmation, this.form.password)
      }
    }
  },
  beforeDestroy() {
    this.unlistenEvent("change-password-dialog", this.handle)
  },
}
</script>