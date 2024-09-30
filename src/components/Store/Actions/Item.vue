<template>
  <div v-if="loading"></div>
  <div v-else>
    <v-btn 
      class="my-2 mt-auto"
      color="light-green text-white"
    >{{ translate("buy-now") }}</v-btn>
    <v-btn
      class="my-2 mt-auto"
      color="blue-darken-1"
      variant="tonal"
    >{{ translate("add-cart") }}</v-btn>
  </div>
</template>
<script>
import CartService from '../../../services/CartService';
import Form from '../../Common/Form.vue';

export default {
  extends: Form,
  inject: ['moneyFormat'],
  props: {
    parent_item: {
      type: Object,
      required: true
    },
    quantity_parent: {
      type: Number
    }
  },
  data() {
    return {
      apiService: CartService,
      preventSnackbar: true,
      itemPrice: 0.00,
      form: {}
    }
  },
  mounted() {
    if (!this.parent_item) return
    this.itemPrice = this.parent_item.price
    this.setData()
  },
}
</script>