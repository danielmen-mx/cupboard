<template>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    color="grey-lighten-3"
    width="300"
  >
    <v-list
      :lines="false"
      nav
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        v-show="requireAdmin(item.require_admin)"
        active-color="info"
        @click="redirect(item.path)"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <p class="text-subtitle-2 pl-1 pt-1">Opciones</p>
      <v-list
        :lines="false"
        nav
      >
        <v-list-item
          v-for="(item, i) in userSettings"
          :key="i"
          :value="item"
          active-color="info"
          @click="redirect(item.path)"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </v-list>
      <ToggleTheme />
      <v-divider></v-divider>
      <div
       class="text-subtitle-2 ml-1"
      >
        Made with <span class="satisfy-font font-size-xsm">love</span> ❤️ by <strong>Daniel Mendez</strong>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
// import Navigation from '../Common/Navigation.vue'
import NavigationMixins from '../../mixins/NavigationMixins';
import ToggleTheme from '@/components/layouts/ToggleThemeOpt.vue'

export default {
  mixins: [NavigationMixins],
  components: {
    ToggleTheme
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    handle() {
      this.drawer = !this.drawer
    }
  },
  mounted() {
    this.listenEvent("turnNavigationDrawer", this.handle)
    this.listenEvent("closeNavigationDrawer", () => {
      this.drawer = false
    })
  }
}
</script>