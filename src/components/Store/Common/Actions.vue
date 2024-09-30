<template></template>
<script>
import Form from '../../Common/Form.vue';
import store from '../../../store';

export default {
  extends: Form,
  methods: {
    setData() {
      let user = store.getters['user']
      this.form.user_id = user.id
      this.form.product_id = this.parent_item.id
      this.form.status = "standby"
      this.form.quantity = !this.quantity_parent ? 1 : this.quantity_parent
    },
    successCallBack(resp) {
      this.fireEvent("open-sidebar-cart")
    }
  },
  mounted() {

  }  
}
</script>