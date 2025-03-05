<template>
  <div v-if="loading"></div>
  <div v-else class="d-flex flex-row-reverse mx-2 px-2 pt-3">
    <v-btn
      :loading="loading"
      class="mx-2 text-white"
      color="light-green"
      density="comfortable"
      @click="buyNow(productId)"
    >{{ translate("buy-now") }} {{ moneyFormat(itemPrice) }}</v-btn>
    <v-btn
      :loading="loading"
      color="blue-darken-1"
      variant="tonal"
      density="comfortable"
      @click="validateUserLogged"
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
    }
  },
  data() {
    return {
      apiService: CartService,
      preventSnackbar: false,
      itemPrice: 0.00,
      productId: null,
      form: {}
    }
  },
  mounted() {
    if (!this.parent_item) return
    this.productId = this.parent_item.id
    this.itemPrice = this.parent_item.price
    this.setData()
  },
}
</script>