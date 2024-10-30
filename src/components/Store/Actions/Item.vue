<template>
  <div v-if="loading"></div>
  <div v-else class="d-flex flex-column my-2">
    <v-btn 
      class="my-2 mt-auto shiny-text"
      color="light-green text-white"
      @click="buyNow(productId)"
    >{{ translate("buy-now") }}</v-btn>
    <v-btn
      class="my-2 mt-auto"
      color="blue-darken-1"
      variant="tonal"
      @click="submit"
    >{{ translate("add-cart") }}</v-btn>
  </div>
</template>
<script>
import CartService from '../../../services/CartService';
import Actions from '../Common/Actions.vue';

export default {
  extends: Actions,
  inject: ['moneyFormat'],
  props: {
    parent_item: {
      type: Object,
      required: true
    },
    parent_quantity: {
      type: String
    }
  },
  data() {
    return {
      apiService: CartService,
      preventSnackbar: true,
      form: {},
      productId: null
    }
  },
  mounted() {
    if (!this.parent_item) return
    console.log(this.parent_item)
    this.quantityRequired = parseInt(this.parent_quantity.replace(/[^0-9]/g, ''), 10)
    this.productId = this.parent_item.id
    this.setData()
  },
  watch: {
    'parent_quantity': {
      handler: function (newVal) {
        let newQty = parseInt(newVal.replace(/[^0-9]/g, ''), 10)
        this.quantityRequired = newQty
        this.form.quantity = newQty
      },
      deep: true,
      immediate: true
    }
  }
}
</script>