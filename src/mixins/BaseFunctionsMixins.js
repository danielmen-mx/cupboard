export default {
  methods: {
    successSnackbar(message) {
      this.emitter.emit(
        'snackbarNotify',
        {
          color: 'success',
          message: message
        }
      )
    },
    errorSnackbar(error) {
      this.emitter.emit(
        'snackbarNotify',
        {
          color: 'error',
          message: error
        }
      )
    },
    fireEvent(event, data = null) {
      this.emitter.emit(event, data)
    },
    listenEvent(event, callBack) {
      this.emitter.on(event, callBack)
    },
    pushRoute(path) {
      this.$router.push({ path: path })
    }
  },
}