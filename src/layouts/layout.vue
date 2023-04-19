<template>
  <v-card>
    <v-layout>
      <Navigation :key="reload" />
      <NavigationDrawer />
      <v-main class="mt-16 pt-6">
        <Dialog />
        <Snackbar />
        <!-- <Background /> -->
        <div class="pa-1" style="min-height: auto">
          <v-container class="pa-1">
            <router-view/>
          </v-container>
        </div>
        <Footer />
      </v-main>
    </v-layout>
  </v-card>
</template>
<script>
import Navigation from '@/components/layouts/NavigationBar.vue'
import NavigationDrawer from '@/components/layouts/NavigationDrawer.vue'
import Background from '@/components/layouts/Background.vue'
import Snackbar from '@/components/layouts/Snackbar.vue'
import Dialog from '@/components/layouts/Dialog.vue'
import Footer from '@/components/layouts/Footer.vue'
import Button from '@/components/layouts/Button.vue'
import responsiveLayout from '../components/Common/Responsives/layout.vue'

export default {
  // extends: responsiveLayout,
  components: {
    Navigation,
    NavigationDrawer,
    Background,
    Snackbar,
    Dialog,
    Footer,
    Button
  },
  data() {
    return {
      reload: false
    }
  },
  mounted() {
    this.emitter.on('reloadComponent', () => {
      this.reload = !this.reload
    })
  },
}
</script>