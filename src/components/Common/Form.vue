<template></template>
<script>
import store from '../../store';
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
    successCallBack(data = null) {},
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
          this.successSnackbar(resp.message)
        }

        if (!this.preventUpdateItems) {
          this.fireEvent(this.event, resp.data)
        }

        this.formComplete = false
        this.form = {}
        this.successCallBack(resp.data)
        // console.log(resp) // test purposes
      } catch (error) {
        console.log(error)
        if (error.exception) this.errorSnackbar(error.exception)
      }

      this.loading = false
    },
    setUserVar() {
      let user = store.getters['user']

      if (!user) return

      return user
    },
    required(v) {
      return !!v || this.translate("form.validations.require-field")
    },
    email(v) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(v) || this.translate("form.validations.bad-email")
    },
    number(v) {
      // const invalidStrings = /^[A-Za-z]*$/
      // console.log(invalidStrings.test(v))
      if (!v) return
      let invalid = isNaN(v)
      return !invalid ? true : this.translate("form.validations.numeric")
    },
    numeric(v) {
      if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 9999999999) return true;
      return this.translate("form.validations.bad-phone")
    },
  },
}
</script>