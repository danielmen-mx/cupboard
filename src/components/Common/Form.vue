<template></template>
<script>
import { formDataFromObject } from './Helpers/Parser.js'

export default {
  data() {
    return {
      formComplete: false,
      apiService: null,
      // form: {},
      loading: false,
      show: false,
      event: 'onSubmit',
      preventSnackbar: false,
      preventUpdateItems: false
    }
  },
  computed: {
    isPostAction() {
      if (this.itemId) {
          return false;
      }

      return true;
    },
    arguments() {
      if (this.form instanceof FormData) {
        formDataFromObject(this.formAppend, this.form)
        return this.form
      }

      return { ...this.form, ...this.formAppend }
    },
  },
  methods: {
    // store() - update()
    async submit() {
      if (!this.form) return

      try {
        this.loading = true
        let resp = null

        if (this.isPostAction) {
          resp = await this.apiService.store(this.arguments)
        } else {
          resp = await this.apiService.update(
            this.itemId,
            this.form
          )
        }

        if (!this.preventSnackbar) {
          // console.log('dispatching snackbar')
          this.successSnackbar(resp.data.message)
        }

        if (!this.preventUpdateItems) {
          // console.log('dispatching event')
          this.fireEvent(this.event, resp.data)
        }

        this.formComplete = false
        this.form = {}
      } catch (error) {
        console.log(error)
      }

      this.loading = false
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