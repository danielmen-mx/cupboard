<template></template>
<script>
import Form from '../../Common/Form.vue';
import store from '../../../store';

export default {
  extends: Form,
  data() {
    return {
      quantityRequired: 1,
    }
  },
  methods: {
    setData() {
      let user = store.getters['user']
      if (!user) return
      this.form.user_id = user.id
      this.form.product_id = this.parent_item.id
      this.form.status = "standby"
      this.form.quantity = this.quantityRequired
    },
    buyNow(id) {
      this.$router.push({ path: `/cart/checkout/${id}` });
    },
    validateUserLogged() {
      let user = store.getters['user']
      if (!user) return this.$router.push({ path: '/login' })
      this.submit
    },
    successCallBack(resp) {
      this.setData()
      this.fireEvent("update-items-cart-table", resp)
      this.fireEvent("open-sidebar-cart")
    }
  },
  mounted() {

  }  
}
</script>