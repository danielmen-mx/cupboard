<template></template>
<script>
import Form from '../../Common/Form.vue';
import store from '../../../store';

export default {
  extends: Form,
  data() {
    return {
      quantityRequired: 1,
      userLogged: null
    }
  },
  methods: {
    setData() {
      if (!this.user) return
      this.form.user_id = this.user.id
      this.form.product_id = this.parent_item.id
      this.form.status = "standby"
      this.form.quantity = this.quantityRequired
    },
    buyNow(id) {
      this.$router.push({ path: `/cart/checkout/${id}` });
    },
    validateUserLogged() {
      if (!this.user) return this.$router.push({ path: '/login' })
      this.submit()
    },
    successCallBack(resp) {
      this.setData()
      this.fireEvent("update-items-cart-table", resp)
      this.fireEvent("open-sidebar-cart")
    }
  },
  mounted() {
    this.user = store.getters['user']
  }  
}
</script>