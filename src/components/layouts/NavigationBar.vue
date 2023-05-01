<template>
  <div v-resize="onResize" >
    <v-app-bar>
      <div class="buttons-group ml-2" >
        <v-app-bar-nav-icon v-if="navIcon" variant="text" @click="openDrawer()"></v-app-bar-nav-icon>
        <v-btn
          v-if="!navIcon"
          v-for="item in items"
          :key="item.title"
          variant="text"
          v-show="requireAdmin(item.require_admin)"
          active-color="info"
          @click="redirect(item.path)"
        >
          {{ item.title }}
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-title class="custom-main-title">
        <strong
        class="cursor-pointer satisfy-font font-size-main-title"
        @click="$router.push('/')"
        >
          Shaddai Shop
        </strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="buttons-group mr-2" >
        <v-btn
          v-if="navIcon"
          icon="mdi-account-key"
          @click="login()"
        ></v-btn>
        <v-btn
          v-else
          @click="login()"
        >
          Registrarse | Iniciar sesión
        </v-btn>
        <ToggleTheme v-if="!navIcon" />
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import NavigationMixins from '../../mixins/NavigationMixins';
import layout from '../Common/Responsives/layout.vue';
import ToggleTheme from '@/components/layouts/ToggleThemeBtn.vue'

export default {
  extends: layout,
  mixins: [NavigationMixins],
  components: {
    ToggleTheme
  },
  data() {
    return {
      //
    }
  },
  methods: {
    login() {
      this.$router.push({ path: '/login'})
    },
    openDrawer() {
      this.$nextTick(() => {
        this.fireEvent("turnNavigationDrawer")
      })
    }
  }
}
</script>
<style>
  .custom-main-title {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size: 18px;
    padding-right: 30px;
    z-index: 0;
  }

  .buttons-group {
    z-index: 1;
  }
</style>