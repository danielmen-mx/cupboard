<template>
  <CartItemsSkeleton v-if="loading" />
  <template v-else>
    <v-row v-if="!items.length" class="centered-container">
      <v-col class="text-center centered-component">
        <v-icon size="x-large" color="grey-darken-1" icon="mdi-cart-outline"></v-icon>
        <h2>{{ translate("cart-module.cart-empty") }}</h2>
        <p class="my-3 pt-2">{{ translate("cart-module.explore-cart") }}.</p>
        <v-btn color="success" class="shiny-text" @click="this.pushRoute('/store')">
          {{ translate("cart-module.redirect-store") }}
        </v-btn>
      </v-col>
    </v-row>
    <div v-else class="ma-1" >
      <v-sheet class="pa-2 rounded-t-lg elevation-1 shaddai-font font-size-sm">
        {{ translate("cart-products") }}
      </v-sheet>
      <v-sheet class="scroll-container-component elevation-1 full-height" style="max-height: 60vh; overflow-y: auto;">
        <template v-for="item in items" :key="item.id">
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
                      class="fill-height cursor-pointer"
                      @click="redirect(item.product.id)"
                      cover
                    ></v-img>
                  </v-avatar>
                  <div>
                    <span class="text-subtitle mt-2 ml-1">
                      {{ strLimit(item.product.name, 50) }}
                    </span>
                    <div class="d-flex mx-1" height="100">
                      <Actions :parent_item_form="item" />
                    </div>
                  </div>
                  <Quantity :item_parent="item" />
                  <div>
                    <v-card-title>
                      {{ moneyFormat(item.quantity * item.product.price) }}
                    </v-card-title>
                    <v-card-subtitle class="text-center mr-2">
                      <v-icon
                        icon="mdi-truck"
                        size="small"
                        color="success"
                      ></v-icon>
                      <span class="ml-2">{{ moneyFormat(item.quantity == 0 ? 0 : item.product.shipping_price) }}</span>
                    </v-card-subtitle>
                  </div>
                </template>
              </v-card>
            </template>
          </v-hover>
        </template>
      </v-sheet>
      <div class="pa-2 px-4 pr-6 rounded-b-lg elevation-1 d-flex justify-space-between">
        <span class="font-weight-medium">{{ translate("shipping-price") }}</span>
        <span class="text-light-green font-weight-bold">{{ moneyFormat(shippingPrice) }}</span>
      </div>
      <CommonPagination :pagination_values="paginationProps" :per_page="query"/>
    </div>
  </template>
</template>
<script>
import Table from '../Common/Table.vue';
import CartService from '../../services/CartService';
import translate from '../../plugins/locales';
import Quantity from './Quantity.vue';
import Actions from './Actions.vue';
import CartItemsSkeleton from '../Common/Skeletons/CartItemsSkeleton.vue';
import CommonPagination from '../Common/Paginations/Common.vue';

export default {
  extends: Table,
  inject: ['strLimit', 'moneyFormat'],
  components: { Quantity, Actions, CartItemsSkeleton, CommonPagination },
  data() {
    return {
      userId: null,
      preventSnackbar: true,
      apiService: CartService,
      cartStatus: "standby",
      event: "update-cart-table",
      query: {
        per_page: 8,
        page: 1
      },
    }
  },
  methods: {
    redirect(id) {
      this.$router.push({ path: '/store/item/' + id });
    },
    updatePagination(properties) {
      if (this.query.per_page === properties.per_page && this.query.page === properties.page) return
      this.query = properties
      this.query.user_id = this.userId
      this.query.status = this.cartStatus
      this.getItems()
    }
  },
  computed: {
    shippingPrice() {
      return this.items.reduce((total, item) => total + (item.quantity >= 1 ? +item.product.shipping_price : 0), 0);
    },
  },
  mounted() {
    this.userId = this.$route.params.userId
    this.query.user_id = this.userId
    this.query.status = this.cartStatus
    this.getItems()
    this.listenEvent("update-cart-total", this.addItem)
    this.listenEvent('update-cart-pagination-component', this.updatePagination)
    this.listenEvent('update-items-cart-table', this.getItems)
    this.listenEvent(this.event, this.removeItem)
  },
  beforeDestroy() {
    this.unlistenEvent("update-cart-total", this.addItem)
    this.unlistenEvent('update-cart-pagination-component', this.updatePagination)
    this.unlistenEvent('update-items-cart-table', this.getItems)
    this.unlistenEvent(this.event, this.removeItem)
  },
}
</script>