<template></template>
<script>
import Form from '../../Common/Form.vue';
import store from '../../../store';

export default {
  extends: Form,
  data() {
    return {
      quantityRequired: 1
    }
  },
  methods: {
    setData() {
      let user = store.getters['user']
      this.form.user_id = user.id
      this.form.product_id = this.parent_item.id
      this.form.status = "standby"
      this.form.quantity = this.quantityRequired
    },
    successCallBack(resp) {
      this.fireEvent("open-sidebar-cart")
      this.setData()
    }
  },
  mounted() {

  }  
}
</script>