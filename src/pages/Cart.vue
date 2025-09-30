<template>
  <div class="d-flex">
    <v-row dense>
      <v-col cols="8" style="max-height: 70vh;">
        <Items />
      </v-col>
      <v-col cols="4" class="pt-2">
        <OrderSummary />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Responsive from '@/components/Common/Responsive.vue'
import Items from '../components/Cart/Items.vue';
import OrderSummary from '../components/Cart/OrderSummary.vue';

export default {
  extends: Responsive,
  components: {
    Items,
    OrderSummary
  }
}
</script>