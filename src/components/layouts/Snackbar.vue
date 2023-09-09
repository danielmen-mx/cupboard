<template>
  <div class="text-center">
    <v-snackbar
      v-model="visible"
      :timeout="timeout"
      :color="color"
    >
      {{ message }}

      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="visible = false"
        >
          {{ translate("close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    visible: false,
    color: 'success',
    message: '',
    timeout: 5000,
    event: 'snackbarNotify'
  }),
  methods: {
    handle(data) {
      this.visible = false
      this.color = data.color
      this.message = data.message
      this.$nextTick(() => {
        this.visible = true
      })
    }
  },
  mounted() {
    this.listenEvent(this.event, this.handle)
  },
}
</script>