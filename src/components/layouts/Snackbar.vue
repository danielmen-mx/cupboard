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
          @click="snackbar = false"
        >
          Close
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
  }),
  mounted() {
    this.emitter.on('snackbarNotify', (data) => {
      this.visible = false
      this.message = data.message
      this.color = data.color
      this.$nextTick(() => {
        this.visible = true
      })
    })
  },
}
</script>