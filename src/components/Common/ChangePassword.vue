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
              color="red"
              size="small"
              variant="outlined"
              width="10vw"
              @click="closeForm"
            >{{ translate("cancel") }}</v-btn>
            <v-btn
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
import Form from './Form.vue';

export default {
  extends: Form,
  data () {
    return {
      form: {},
      confirmation: '',
      buttonWidth: 140,
      visible: false,
      apiService: null,
      itemId: null,
      event: null,
      preventRemoveItem: null,
      preventSnackbar: null,
      preventReload: null,
    }
  },
  methods: {
    closeForm() {
      this.visible = false
      this.form = {}
      this.confirmation = ''
    },
    matchPassword(v) {
      if (this.form.password) {
        if (this.form.password !== v) return this.translate("login.validations.password")
      }
    },
    handle(data) {
      // this.itemId = data.id
      // this.apiService = data.apiService
      // this.event = data.event
      // this.preventRemoveItem = data.preventRemoveItem,
      // this.preventSnackbar = data.preventSnackbar,
      // this.preventReload = data.preventReload,
      setTimeout(() => { this.visible = true }, 100);
    },
    submit() {
      this.remove(this.itemId)
      this.visible = false
    },
    successCallBack() {
      this.fireEvent(this.event)
    }
  },
  mounted() {
    this.listenEvent("change-password-dialog", this.handle)
  },
  beforeDestroy() {
    this.unlistenEvent("change-password-dialog", this.handle)
  },
}
</script>