<template>
  <v-card-subtitle class="mx-auto" max-width="200" rounded="lg">
    <v-text-field
      :loading="loading"
      prepend-inner-icon="mdi-minus"
      append-inner-icon="mdi-plus"
      @click:prepend-inner="subtractQty()"
      @click:append-inner="increaseQty()"
      density="compact"
      v-model="form.quantity"
      variant="solo"
      class="centered-input"
      hide-details
      single-line
      readonly
    ></v-text-field>
  </v-card-subtitle>
</template>
<script>
import Form from '../Common/Form.vue';
import CartService from '../../services/CartService';

export default {
  extends: Form,
  props: {
    item_parent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      item: {},
      itemId: null,
      form: {},
      maxQty: null,
      preventSnackbar: true,
      apiService: CartService
    }
  },
  methods: {
    updateQty(operation) {
      
    },
    subtractQty() {
      if (this.form.quantity == 0) return
      let newQty = this.form.quantity - 1
      this.form.quantity = newQty
      this.submit()
    },
    increaseQty() {
      if (this.form.quantity == this.maxQty) return
      let newQty = this.form.quantity + 1
      this.form.quantity = newQty
      this.submit()
    },
    successCallBack(resp) {
      this.form = resp
      this.fireEvent("update-cart-total", resp)
    }
  },
  mounted() {
    this.form = this.item_parent
    this.itemId = this.form.id
    this.maxQty = this.form.product.stock
    if (!this.form) return
    console.log(this.form)
  },
}
</script>
<style scoped>
.centered-input::v-deep input {
  text-align: center;
}
</style>