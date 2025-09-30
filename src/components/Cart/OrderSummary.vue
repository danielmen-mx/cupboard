<template>
  <v-card class="pa-2" outlined>
    <v-card-title class="text-h6">{{ translate("cart-module.order-summary") }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <div class="d-flex justify-space-between">
        <span>{{ translate("cart-module.subtotal") }}</span>
        <span>MXN$ 0.00</span>
      </div>
      <div class="d-flex justify-space-between">
        <span>{{ translate("cart-module.tax") }}</span>
        <span>MXN$ 0.00</span>
      </div>
      <div class="d-flex justify-space-between">
        <span>{{ translate("cart-module.total") }}</span>
        <span>MXN$ 0.00</span>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" block>{{ translate("cart-module.checkout") }}</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      // Placeholder for future data properties
    }
  },
}
</script>