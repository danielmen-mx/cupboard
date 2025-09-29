<template>
  <div class="d-flex">
    <v-row dense>
      <v-col cols="8" style="max-height: 70vh;">
        <Items />
      </v-col>
      <v-col cols="4" class="pt-2">
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
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Responsive from '@/components/Common/Responsive.vue'
import Items from '../components/Cart/Items.vue';

export default {
  extends: Responsive,
  components: {
    Items
  }
}
</script>