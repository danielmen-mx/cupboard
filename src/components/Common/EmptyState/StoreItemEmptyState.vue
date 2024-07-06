<template>
  <v-card class="d-flex flex-column align-center justify-center elevation-0" height="100%" style="padding-bottom: 18vh;">
    <v-icon size="100">mdi-store-remove</v-icon>
    <v-sheet class="elevation-0 pt-2 text-center text-grey-darken-3 text-h5">
      Oh no!
    </v-sheet>
    <v-sheet class="elevation-0 text-center text-grey-darken-6 text-h5">
      {{ translate("empty-states.StoreItems.no-items") }}
    </v-sheet>
    <v-sheet class="elevation-0 text-center text-grey-darken-1 text-h6">
      {{ translate("empty-states.StoreItems.come-back") }} <strong class="cursor-pointer" @click="refreshComponent">{{ translate("empty-states.StoreItems.refresh").toLowerCase() }}</strong>
    </v-sheet>
  </v-card>
</template>
<script>
export default {
  methods: {
    refreshComponent() {
      this.fireEvent("refresh-store-items-component")
    }
  },
}
</script>