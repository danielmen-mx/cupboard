<template>
  <v-card>
    <v-layout>
      <Navigation />
      <NavigationDrawer />
      <v-main class="mt-16 pt-6">
        <Dialog />
        <Settings />
        <Confirmation />
        <Snackbar />
        <!-- <Background /> -->
        <div class="pa-1">
          <v-container class="pa-1" style="min-height: 87vh">
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
import Confirmation from '../components/Common/Confirmation.vue'
import Settings from '../components/layouts/Settings.vue'
import responsiveLayout from '../components/Common/Responsives/layout.vue'

export default {
  // extends: responsiveLayout,
  components: {
    Navigation,
    NavigationDrawer,
    Background,
    Snackbar,
    Dialog,
    Settings,
    Confirmation,
    Footer,
    Button
  },
  data() {
    return {
      reload: false,
      navIcon: false
    }
  },
  mounted() {
    this.listenEvent('reloadComponent', (navBool) => {
      this.reload = !this.reload
      this.navIcon = navBool
    })
  },
}
</script>