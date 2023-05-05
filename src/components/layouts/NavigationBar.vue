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
          {{ business }}
        </strong>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="buttons-group mr-2 d-flex" >
        <div v-if="!isLogged">
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
        </div>
        <div v-else>
          <v-btn
            v-if="navIcon"
            icon="mdi-logout"
            @click="logout()"
          ></v-btn>
          <v-btn
            v-else
            @click="logout()"
          >
            {{ user }}, Cerrar sesión
          </v-btn>
        </div>
        <div>
          <ToggleTheme v-if="!navIcon" />
        </div>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
import NavigationMixins from '../../mixins/NavigationMixins';
import layout from '../Common/Responsives/layout.vue';
import ToggleTheme from '@/components/layouts/ToggleThemeBtn.vue'
import AuthService from '../../services/AuthService';
import store from '../../store';

export default {
  extends: layout,
  mixins: [NavigationMixins],
  components: {
    ToggleTheme
  },
  data() {
    return {
      business: 'Shaddai Shop',
      apiService: AuthService,
      form: {}
    }
  },
  methods: {
    login() {
      this.$router.push({ path: '/login'})
    },
    async logout() {
      try {
        this.form.user = store.getters['user']
        const resp = await this.apiService.logout(this.form)
        // console.log(resp)

        this.$store.commit('logout')
        this.isLogged = false
        this.$router.push({ path: '/' })
      } catch (error) {
        console.log(error) 
      }
    },
    openDrawer() {
      this.$nextTick(() => {
        this.fireEvent("turnNavigationDrawer")
      })
    }
  },
  mounted() {
    //
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