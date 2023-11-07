<template>
  <div class="text-center">
    <v-btn
      color="orange-darken-4"
      @click="openSnackbar()"
    >
      Open Snackbar
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      snackbar: {
        message: 'This event is dispatched success',
        color: 'success'
      },
      dialog: {
        title: 'Event dispatched',
        text: 'The event has been dispatched success'
      }
    }
  },
  methods: {
    openSnackbar() {
      // this.successSnackbar(this.snackbar)
      this.fireEvent('openDrawer')
    }
  },
}
</script>