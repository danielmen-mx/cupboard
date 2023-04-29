<template></template>
<script>
export default {
  data() {
    return {
      formComplete: false,
      apiService: null,
      // form: {},
      loading: false,
      show: false,
      event: 'onSubmit'
    }
  },
  methods: {
    submit() { // store() - update()
      if (!this.form) return

      this.loading = true
      // console.log('Form contain: ', this.form)
      // const resp = this.apiService.store()

      setTimeout(() => {
        this.form = {}
        this.fireEvent(this.event)
        this.formComplete = false
        this.loading = false
      }, 2500);
    },
    required(v) {
      return !!v || 'Campo requerido'
    },
    email(v) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(v) || 'Correo no válido.'
    },
    numeric(v) {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 9999999999) return true;
      return 'Tu número telefonico debe estar mal';
    },
  },
}
</script>