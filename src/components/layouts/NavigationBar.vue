<template>
  <div v-resize="onResize" >
    <v-app-bar>
      <div class="buttons-group ml-2" >
        <v-app-bar-nav-icon v-if="navIcon" variant="text" @click="openDrawer()"></v-app-bar-nav-icon>
        <v-btn
          v-if="!navIcon"
          v-for="item in items"
          :key="item.title"
          variant="plain"
          :ripple="false"
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
            variant="plain"
            icon="mdi-account-key"
            @click="login()"
          ></v-btn>
          <v-btn
            v-else
            variant="plain"
            @click="login()"
          >
            Registrarse | Iniciar sesión
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            v-if="navIcon"
            variant="plain"
            icon="mdi-logout"
            @click="logout()"
          ></v-btn>
          <div v-else class="d-flex">
             <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  variant="plain"
                  class="mr-0 pr-0"
                  :ripple="false"
                >
                  {{ user }},
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in userSettings"
                  :key="i"
                  :value="i"
                  active-color="info"
                  @click="redirect(item.path)"
                >
                  <template v-slot:prepend>
                    <v-icon :icon="item.icon" size="small"></v-icon>
                  </template>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn
              variant="plain"
              class="ml-0 pl-1"
              @click="logout()"
            >
              Cerrar sesión
            </v-btn>

          </div>
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