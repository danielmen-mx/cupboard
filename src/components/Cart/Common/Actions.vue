<template></template>
<script>
import Form from '../../Common/Form.vue';
import CartService from '../../../services/CartService';

export default {
  extends: Form,
  data() {
    return {
      form: {},
      itemId: null,
      apiService: CartService,
      preventSnackbar: true
    }
  },
  methods: {
    updateState(newState) {
      this.form.status = newState
      this.submit()
    },
    successCallBack(resp) {
      this.fireEvent("update-items-cart-table", resp.id)
    }
  }
}
</script>