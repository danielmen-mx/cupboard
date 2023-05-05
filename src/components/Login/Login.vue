<template>
  <v-form
    v-model="formComplete"
    @submit.prevent="submit"
  >
    <v-text-field
      v-model="form.email"
      :readonly="loading"
      :rules="[required]"
      class="mb-2"
      clearable
      label="Usuario ó Email"
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      :readonly="loading"
      :rules="[required]"
      :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show ? 'text' : 'password'"
      @click:append-inner="show = !show"
      clearable
      label="Contraseña"
      placeholder="Introduce tu contraseña"
    ></v-text-field>

    <v-checkbox
      v-model="form.remember"
      label="Recuerdame"
    ></v-checkbox>

    <br>

    <v-btn
      :disabled="!formComplete"
      :loading="loading"
      block
      color="success"
      size="large"
      type="submit"
      variant="elevated"
    >
      Iniciar Sesión
    </v-btn>
    <div :class="loginClass">
      <p
        class="cursor-pointer text-grey mt-2 text-decoration-underline"
        @click="redirect('/')"
      >
        Home
      </p>
      <p
        class="cursor-pointer text-grey mt-2 text-decoration-underline"
        @click="redirect('/login/register')"
      >
        No tienes una cuenta?
      </p>
    </div>
  </v-form>
</template>
<script>
import Form from '../Common/Form.vue'
import login from '../Common/Responsives/login.vue'
import AuthService from '../../services/AuthService'
import { mapMutations } from "vuex";

export default {
  extends: Form,
  data() {
    return {
      loginClass: '',
      apiService: AuthService,
      preventSnackbar: true,
      form: {
        remember: false
      },
    }
  },
  methods: {
    ...mapMutations("", ["setToken", "setUser", "setName", "setEmail"]),
    redirect(path) {
      this.pushRoute(path)
    },
    async submit() {
      if (!this.form) return

      try {
        this.loading = true
        const resp = await this.apiService.login(this.form)
        // console.log(resp)

        var token = resp.data.token
        var expires = resp.data.expires
        var user = resp.data.user

        this.$store.commit('setToken', { token: token, expires: expires })
        this.$store.commit('setUser', { user: user })

        this.$nextTick(() => {
          this.successSnackbar(resp.message)
          this.formComplete = false
          this.loading = false
          this.redirect('/')
        })
      } catch (error) {
        console.log(error)
        this.errorSnackbar(error.exception)
        this.loading = false
      }
    },
  },
  mounted() {
    this.listenEvent('login-resized', (data) => {
      this.loginClass = data.loginClass
    })
  },
}
</script>