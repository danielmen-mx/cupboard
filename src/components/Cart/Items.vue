<template>
  <div v-if="loading"></div>
  <template v-else>
    <div v-if="items.length == 0"></div>
    <div v-else class="ma-2" >
      <!-- nes test: testing github commits -->
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
                <div>
                  <span class="text-subtitle mt-2 ml-1">
                    {{ strLimit(item.product.name, 50) }}
                  </span>
                  <div class="d-flex mx-1" height="100">
                    <v-btn variant="text" size="small" class="mr-2 ma-2 pa-2 align-self-end" color="blue-darken-4">Remove</v-btn>
                    <v-btn variant="text" size="small" class="mx-2 ma-2 pa-2 align-self-end" color="blue-darken-4">Save for later</v-btn>
                    <v-btn variant="text" size="small" class="ml-2 ma-2 pa-2 align-self-end" color="blue-darken-4">Buy now</v-btn>
                  </div>
                </div>
                <Quantity :item_parent="item" />
                <div>
                  <v-card-title>
                    {{ pricePerProduct(item.quantity, item.product.price) }}
                  </v-card-title>
                  <v-card-subtitle class="text-center mr-2">
                    <v-icon
                      icon="mdi-truck"
                      size="small"
                      color="success"
                    ></v-icon>
                    <span class="ml-2">{{ item.quantity == 0 ? "0.00" : item.product.shipping_price }}</span>
                  </v-card-subtitle>
                </div>
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
import Quantity from './Quantity.vue';

export default {
  extends: Table,
  inject: ['strLimit', 'moneyFormat'],
  components: { Quantity },
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
    pricePerProduct(qty, price) {
      let totalPrice = qty * price
      return this.moneyFormat(totalPrice)
    },
    updateCart(item) {
      this.addItem(item)
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
    this.listenEvent("update-cart-total", this.updateCart)
  },
}
</script>