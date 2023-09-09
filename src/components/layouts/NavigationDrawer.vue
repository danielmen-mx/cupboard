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

        <v-list-item-title v-text="translate(item.title)"></v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <p class="pl-1 pt-1 satisfy-font font-size-xsm">{{ translate("options") }}</p>
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

          <v-list-item-title v-text="translate(item.title)"></v-list-item-title>
        </v-list-item>
      </v-list>
      <ToggleTheme />
      <v-divider></v-divider>
    </v-list>
    <v-spacer style="height: 5vh;"></v-spacer>
    <div class="text-subtitle-2 label-footer d-flex justify-center align-center bg-grey-lighten-4 pa-3" >
      <p>
        Made with <span class="satisfy-font font-size-xsm">love</span> ❤️ by <strong>Daniel Mendez</strong>
      </p>
    </div>
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
<style>
.label-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 5vh;
}
</style>