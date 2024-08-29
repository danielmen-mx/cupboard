<template>
  <div v-if="loading"></div>
  <template v-else>
    <div v-if="items.length == 0"></div>
    <div v-else class="ma-2" >
      <div class="pa-2 rounded-t-lg elevation-1 shaddai-font font-size-sm">
        {{ translate("cart-products") }}
      </div>
      <template
        v-for="item in items"
        :key="item.id"
      >
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card 
              class="pa-2 rounded-0 elevation-1"
              v-bind="props"
              :color="isHovering ? 'amber' : undefined"
            >
              <template class="d-flex ">
                <v-avatar
                  class="mr-2"
                  rounded="2"
                  size="80"
                >
                  <v-img
                    :src="item.product.image"
                    lazy-src="/logo/shadai-main.jpeg"
                    class="fill-height"
                    cover
                  ></v-img>
                </v-avatar>
                <span class="text-subtitle">
                  {{ strLimit(item.product.name, 50) }}
                </span>
                <v-card-subtitle class="mx-auto" max-width="200" rounded="lg">
                  <v-text-field
                    :loading="loading"
                    prepend-inner-icon="mdi-minus"
                    append-inner-icon="mdi-plus"
                    @click:prepend-inner="subtractQty"
                    @click:append-inner="increaseQty"
                    density="compact"
                    v-model="item.quantity"
                    variant="solo"
                    class="centered-input"
                    hide-details
                    single-line
                    readonly
                  ></v-text-field>
                </v-card-subtitle>
                <v-card-title>
                  {{ pricePerProduct(item.quantity, item.product.price) }}
                </v-card-title>
              </template>
            </v-card>
          </template>
        </v-hover>
      </template>
      <div class="pa-2 px-4 pr-6 rounded-b-lg elevation-1 d-flex justify-space-between">
        <span class="font-weight-medium">{{ translate("shipping-price") }}</span>
        <span class="text-light-green font-weight-bold">{{ moneyFormat(shippingPrice) }}</span>
      </div>
    </div>
  </template>
</template>
<script>
import Table from '../Common/Table.vue';
import CartService from '../../services/CartService';
import translate from '../../plugins/locales';

export default {
  extends: Table,
  inject: ['strLimit', 'moneyFormat'],
  data() {
    return {
      userId: null,
      preventSnackbar: true,
      apiService: CartService,
      cartStatus: "standby",
      query: {
        per_page: 8,
        page: 1
      }
    }
  },
  methods: {
    subtractQty() {
      
    },
    increaseQty() {
      
    },
    pricePerProduct(qty, price) {
      let totalPrice = qty * price
      return this.moneyFormat(totalPrice)
    }
  },
  computed: {
    shippingPrice() {
      return 0
    },
  },
  mounted() {
    this.userId = this.$route.params.userId
    this.query.user_id = this.userId
    this.query.status = this.cartStatus
    this.getItems()
  },
}
</script>
<style scoped>
.centered-input::v-deep input {
  text-align: center;
}
</style>