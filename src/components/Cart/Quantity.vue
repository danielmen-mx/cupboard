<template>
  <v-card-subtitle class="mx-auto" max-width="200" rounded="lg">
    <v-text-field
      :loading="loading"
      density="compact"
      v-model="form.quantity"
      variant="solo"
      class="centered-input no-outline"
      hide-details
      single-line
      readonly
    >
      <template
        v-slot:prepend-inner
      ><v-icon @click="adjustQty(-1)">mdi-minus</v-icon></template>
      <template
        v-slot:append-inner
      ><v-icon @click="adjustQty(1)">mdi-plus</v-icon></template>
    </v-text-field>
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
    adjustQty(amount) {
      const newQty = this.form.quantity + amount;

      if (newQty >= 0 && newQty <= this.maxQty) {
        this.form.quantity = newQty;
        this.submit();
      }
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
  },
}
</script>
<style scoped>
.centered-input::v-deep input {
  text-align: center;
}

.no-outline .v-input__control {
  border: none !important;
  box-shadow: none !important;
}

.no-outline input {
  border: none !important;
  outline: none !important;
}

.no-outline .v-fieldset {
  border: none !important;
}

.no-outline .v-text-field__details {
  display: none;
}
</style>