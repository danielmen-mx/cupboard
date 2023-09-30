<template>
  <AdminSettingsSkeleton v-if="!user"/>
  <div v-else>
    <v-card class="pa-6 elevation-0">
      <span class="text-h5">
        {{ translate("profile") }}
      </span>
      <v-divider></v-divider>
      <v-form
        ref="form"
        @submit.prevent="validate"
      >
        <v-responsive
          class="my-4 mx-4"
          max-width="34vw"
        >
          <div class="d-flex align-center">
            <div class="configuration-title px-4">
              {{ translate("user-settings.username") }}:
            </div>
            <v-text-field
              v-model="form.username"
              :loading="loading"
              :disabled="loading || validatingUsername"
              variant="solo"
              density="compact"
              class="pt-5"
              single-line
            >
              <template v-slot:append-inner>
                  <v-progress-circular
                    v-if="validatingUsername"
                    color="info"
                    indeterminate
                    size="24"
                  ></v-progress-circular>
                  <v-tooltip v-else location="bottom" >
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        :color="validatedUsername === false ? 'red' : 'green'"
                        :icon="validatedUsername === false ? 'mdi-close-circle-outline' : 'mdi-check-circle-outline'"
                      ></v-icon>
                    </template>
                      {{ usernameValidationTooltip }}
                  </v-tooltip>
              </template>
              <template v-slot:append>
                <v-tooltip location="right" >
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      icon="mdi-account-search"
                      @click="handleUsernameValidation"
                    ></v-icon>
                  </template>
                    {{ translate("user-settings.validate-username") }}
                </v-tooltip>
              </template>
            </v-text-field>
          </div>
          <div class="d-flex align-center ">
            <div class="configuration-title px-4">
              {{ translate("email") }}:
            </div>
            <v-text-field
              v-model="form.email"
              :loading="loading"
              :disabled="loading || validatingEmail"
              variant="solo"
              density="compact"
              class="pt-5"
              single-line
            >
              <template v-slot:append-inner>
                  <v-progress-circular
                    v-if="validatingEmail"
                    color="info"
                    indeterminate
                    size="24"
                  ></v-progress-circular>
                  <v-tooltip v-else location="bottom" >
                    <template v-slot:activator="{ props }">
                      <v-icon
                        v-bind="props"
                        :color="validatedEmail === false ? 'red' : 'green'"
                        :icon="validatedEmail === false ? 'mdi-close-circle-outline' : 'mdi-check-circle-outline'"
                      ></v-icon>
                    </template>
                      {{ emailValidationTooltip }}
                  </v-tooltip>
              </template>
              <template v-slot:append>
                <v-tooltip location="right" >
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      @click="handleEmailValidation"
                    >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    ><path d="M16.5 11C19 11 21 13 21 15.5C21 16.38 20.75 17.21 20.31 17.9L23.39 21L22 22.39L18.88 19.32C18.19 19.75 17.37 20 16.5 20C14 20 12 18 12 15.5S14 11 16.5 11M16.5 13C15.12 13 14 14.12 14 15.5S15.12 18 16.5 18 19 16.88 19 15.5 17.88 13 16.5 13M10.5 18H3V8L10.62 12.76C11.65 10.54 13.9 9 16.5 9C16.77 9 17.04 9 17.31 9.06L19 8V9.5C19.75 9.81 20.42 10.27 21 10.82V6C21 4.9 20.1 4 19 4H3C1.9 4 1 4.9 1 6V18C1 19.1 1.9 20 3 20H11.82C11.27 19.42 10.82 18.75 10.5 18M19 6L11 11L3 6H19Z" /></svg>
                    </v-icon>
                  </template>
                    {{ this.translate("user-settings.validate-email") }}
                </v-tooltip>
              </template>
            </v-text-field>
          </div>
          <div class="d-flex align-center ">
            <div class="configuration-title px-4">
              {{ translate("user-settings.first-name") }}:
            </div>
            <v-text-field
              v-model="form.first_name"
              :loading="loading"
              :disabled="loading"
              variant="solo"
              density="compact"
              class="pt-5"
              single-line
            ></v-text-field>
          </div>
          <div class="d-flex align-center ">
            <div class="configuration-title px-4">
              {{ translate("user-settings.last-name") }}:
            </div>
            <v-text-field
              v-model="form.last_name"
              :loading="loading"
              :disabled="loading"
              variant="solo"
              density="compact"
              class="pt-5"
              single-line
            ></v-text-field>
          </div>
          <div class="d-flex align-center ">
            <div class="configuration-title px-4">
              {{ translate("user-settings.language") }}:
            </div>
            <v-select
              v-model="form.language"
              :loading="loading"
              :disabled="loading"
              :items="languages"
              item-title="title"
              variant="solo"
              density="compact"
              class="pt-5"
              single-line
            ></v-select>
          </div>
          <div class="d-flex flex-row-reverse mt-8">
            <v-btn
              :loading="loading"
              :disabled="loading || validatingUsername || validatingEmail || validatedEmail === false || validatedUsername === false"
              density="comfortable"
              variant="tonal"
              color="success"
              type="submit"
            >{{ translate("update") }}</v-btn>
          </div>
        </v-responsive>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import Form from '../Common/Form.vue'
import UserService from '@/services/UserService'
import { formatRequest } from '../../utils/requests'
import { mapMutations } from "vuex"
import { updateLang } from '../../router/languages'
import AdminSettingsSkeleton from '../Common/Skeletons/AdminSettingsSkeleton.vue'

export default {
  ...mapMutations("", ["setToken", "setUser", "setName", "setEmail", "setLanguage"]),
  extends: Form,
  mixins: [formatRequest],
  components: {
    AdminSettingsSkeleton
  },
  data() {
    return {
      validatingUsername: false,
      validatingEmail: false,
      validatedUsername: null,
      validatedEmail: null,
      form: {},
      itemId: null,
      user: null,
      apiService: UserService
    }
  },
  methods: {
    async handleUsernameValidation() {
      if (this.user.username === this.form.username) return
      try {
        this.validatingUsername = true
        this.loading = true
        let req = this.formatRequest({username: this.form.username})

        const resp = await this.apiService.validateUsername(this.itemId, req)

        this.successSnackbar(resp.message)
        this.validatedUsername = true
        this.validatingUsername = false
        this.loading = false
      } catch (error) {
        console.log(error)
        this.errorSnackbar(error.message??exception)
        this.validatedUsername = false
        this.validatingUsername = false
        this.loading = false
      }
    },
    async handleEmailValidation() {
      if (this.user.email === this.form.email) return
      try {
        this.validatingEmail = true
        this.loading = true
        let req = this.formatRequest({email: this.form.email})

        const resp = await this.apiService.validateEmail(this.itemId, req)

        this.successSnackbar(resp.message)
        this.validatedEmail = true
        this.validatingEmail = false
        this.loading = false
      } catch (error) {
        console.log(error)
        this.errorSnackbar(error.message??exception)
        this.validatedEmail = false
        this.validatingEmail = false
        this.loading = false
      }
    },
    validate() {
      if (this.form.username === this.user.username) this.form.username = ""
      if (this.form.email === this.user.email) this.form.email = ""
      this.submit()
    },
    successCallBack(data) {
      var user = data
      var language = data.language
      this.$store.commit('setUser', { user: user })
      this.$store.commit('setLanguage', { language: language })
      updateLang(language)
      this.getItem()
      this.fireEvent("update-username-in-navigation-bar", data.username)
    },
    getItem() {
      setTimeout(() => {
        this.user = Object.assign({}, this.setUserVar())
        if (!this.user) return
        this.form = Object.assign({}, this.user)
        this.itemId = this.form.id
      }, 200);
    }
  },
  computed: {
    usernameValidationTooltip() {
      if (this.validatedUsername === null) return this.translate("user-settings.correct-username")
      return this.validatedUsername ? this.translate("user-settings.validated-username") : this.translate("user-settings.fail-validation-username")
    },
    emailValidationTooltip() {
      if (this.validatedEmail === null) return this.translate("user-settings.correct-email")
      return this.validatedEmail ? this.translate("user-settings.validated-email") : this.translate("user-settings.fail-validation-email")
    },
    waitUsernameValidation() {
      if (this.form.username !== this.user.username) return this.validatedUsername = false
      return this.validatedUsername = true
    },
    waitEmailValidation() {
      if (this.form.email !== this.user.email) return this.validatedEmail = false
      return this.validatedEmail = true
    },
    languages() {
      return [
        { title: this.translate("es"), value: "es" },
        { title: this.translate("en"), value: "en" }
      ]
    }
  },
  mounted() {
    this.getItem()
  },
  watch: {
    'validated_username': {
      handler: function () {
        this.usernameValidationTooltip
      },
      deep: true,
      immediate: true
    },
    'validated_email': {
      handler: function () {
        this.emailValidationTooltip
      }
    },
    'form.username': {
      handler: function () {
        this.waitUsernameValidation
      },
      deep: true,
      inmediate: true
    },
    'form.email': {
      handler: function () {
        this.waitEmailValidation
      },
      deep: true,
      inmediate: true
    }
  }
}
</script>
<style>
.configuration-title {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: 700;
  font-size: 1.3em;
  color: rgb(56, 55, 55)
}
</style>