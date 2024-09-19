<template>
  <v-card>
    <v-layout>
      <Navigation />
      <NavigationDrawer />
      <v-main class="mt-16 pt-6">
        <CartSidebar />
        <Dialog />
        <Settings />
        <Confirmation />
        <ChangePassword />
        <Snackbar />
        <CustomDrawer />
        <!-- <Background /> -->
        <div class="pa-0">
          <v-container class="elevation-1 pa-3 mt-2" style="min-height: 79.9vh">
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
import CustomDrawer from '../components/layouts/CustomDrawer.vue'
import Background from '@/components/layouts/Background.vue'
import Snackbar from '@/components/layouts/Snackbar.vue'
import Dialog from '@/components/layouts/Dialog.vue'
import Footer from '@/components/layouts/Footer.vue'
import Button from '@/components/layouts/Button.vue'
import Confirmation from '../components/Common/Confirmation.vue'
import ChangePassword from '../components/Common/ChangePassword.vue'
import Settings from '../components/layouts/Settings.vue'
import responsiveLayout from '../components/Common/Responsives/layout.vue'
import CartSidebar from '../components/layouts/CartSidebar.vue'

export default {
  // extends: responsiveLayout,
  components: {
    Navigation,
    NavigationDrawer,
    CustomDrawer,
    CartSidebar,
    Background,
    Snackbar,
    Dialog,
    Settings,
    Confirmation,
    ChangePassword,
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