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
      data: {
        message: 'This event is dispatched success',
        color: 'success'
      }
    }
  },
  methods: {
    openSnackbar() {
      this.emitter.emit('snackbarNotify', this.data)
    }
  },
}
</script>