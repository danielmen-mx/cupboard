<template>
  <v-row justify="center">
    <v-dialog
      v-model="showModal"
      activator="parent"
      width="37vw"
    >
      <v-card>
        <v-card-actions class="d-flex justify-space-between flex-row-reverse pa-2">
          <v-btn
          icon="mdi-close-circle-outline"
          @click="showModal = false"
          ></v-btn>
          <v-card-title>
            {{ translate("user_settings") }}
          </v-card-title>
        </v-card-actions>
        <UserSettings />
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import UserSettings from '../User/UserSettings.vue'

export default {
  components: {
    UserSettings
  },
  data () {
    return {
      event: 'openUserSettings',
      showModal: false
    }
  },
  methods: {
    handle() {
      this.showModal = false
      this.$nextTick(() => { this.showModal = true })
    }
  },
  mounted() {
    this.listenEvent(this.event, this.handle)
  },
}
</script>