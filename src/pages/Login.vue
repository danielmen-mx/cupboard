<template>
  <v-parallax
    class="h-screen"
    lazy-src="../../public/logo/shadai-main.jpeg"
    v-resize="onResize"
  >
    <div class="d-flex fill-height justify-center align-center">
      <v-card class="mx-auto px-6 py-8" :width="width">
        <LoginForm />
        <Snackbar />
      </v-card>
    </div>
  </v-parallax>
  <Recover />
  <Register />
  <!-- <ResetPassword /> -->
</template>
<script>
import login from '@/components/Common/Responsives/login.vue'
import Register from '../components/Login/Register.vue'
import LoginForm from '../components/Login/Login.vue'
import Snackbar from '@/components/layouts/Snackbar.vue'
import Recover from '../components/Login/Recover.vue'
import ResetPassword from '../components/Login/ResetPassword.vue'

export default {
    extends: login,
    components: {
      Register,
      Recover,
      LoginForm,
      Snackbar,
      // ResetPassword
    },
    data: () => ({
      //
    }),
    mounted() {
      this.onResize()
    }
  }
</script>