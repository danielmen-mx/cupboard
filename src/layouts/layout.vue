<template>
  <main>
    <v-layout>
      <Navigation />
    </v-layout>
    <v-divider class="my-5"></v-divider>
    <div class="mt-16 pa-2">
      <Dialog />
      <Snackbar />
      <Button />
      <!-- <Background /> -->
    </div>
  </main>
  <!-- <Navigation /> -->
  <!-- <Background /> -->
</template>
<script>
import Navigation from '@/components/layouts/NavigationBar.vue'
import Background from '@/components/layouts/Background.vue'
import Snackbar from '@/components/layouts/Snackbar.vue'
import Dialog from '@/components/layouts/Dialog.vue'
import Button from '@/components/layouts/Button.vue'

export default {
  components: {
    Navigation,
    Background,
    Snackbar,
    Dialog,
    Button
  }
}
</script>