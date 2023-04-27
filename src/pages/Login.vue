<template>
  <v-parallax
    class="h-screen"
    lazy-src="../../public/logo/shadai-main.jpeg"
    v-resize="onResize"
  >
    <div class="d-flex fill-height justify-center align-center">
      <v-card class="mx-auto px-6 py-8" :width="width">
      <LoginForm />
    </v-card>
    </div>
  </v-parallax>
  <Register />
</template>
<script>
import login from '@/components/Common/Responsives/login.vue'
import Register from '../components/Login/Register.vue'
import LoginForm from '../components/Login/LoginForm.vue'

export default {
    extends: login,
    components: {
      Register,
      LoginForm
    },
    data: () => ({
      //
    }),
    mounted() {
      this.onResize()
    }
  }
</script>