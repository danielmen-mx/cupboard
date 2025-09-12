<template>
  <v-navigation-drawer
    v-model="cartSidebar"
    location="right"
    temporary
    width="400"
    app
  >
    <v-card class="d-flex flex-column" flat>
      <v-card-title class="d-flex align-center justify-space-between">
        <span class="text-h6">{{ translate("cart") }}</span>
        <v-btn
          icon
          @click="closeCartSidebar()"
          size="x-small"
          flat
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>
    <v-divider></v-divider>
    <template v-if="!items">
      <!-- Skeleton Loader -->
    </template>
    <div v-else>
      <template v-if="!items.length">
        <v-container class="d-flex flex-column align-center justify-center text-center fill-height">
          <v-img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            max-width="200"
            class="mb-6"
          ></v-img>

          <h2 class="text-h5 font-weight-medium mb-2">
            {{ translate("store-module.cart.empty") }}
          </h2>

          <p class="text-body-2 text-grey-darken-1 mb-6">
            {{ translate("store-module.cart.add-empty-state") }}
          </p>

          <v-btn
            color="primary"
            prepend-icon="mdi-cart-plus"
            @click="closeCartSidebar()"
          >
            {{ translate("store-module.cart.go-store") }}
          </v-btn>
        </v-container>
      </template>
      <template v-else>
        <v-card
          class="mx-auto"
          max-width="500"
          flat
        >
          <v-container fluid>
            <v-row dense>
              <v-col
                cols="12"
                class="scroll-container-component" style="max-height: 66.5vh;"
              >
                <v-card
                  v-for="item in items"
                  :key="item.id"
                  class="mb-2"
                >
                  <v-img
                    :src="item.product.image"
                    lazy-src="/logo/shadai-main.jpeg"
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="100px"
                    cover
                  ><v-card-title class="text-white" :text="strLimit(item.product.name, 50)"></v-card-title>
                  </v-img>
                
                  <div class="d-flex align-center justify-center ma-2">
                    <span class="text-subtitle-1">{{ moneyFormat(item.quantity * item.product.price) }}</span>
                    <v-spacer></v-spacer>
                    <div class="pa-2">
                      <Quantity :item_parent="item"/>
                    </div>
                    <RemoveCartItem :parent_item_form="item" />
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <v-card flat>
          <v-card-text>
            <div class="text-h5"><strong class="text-green">MXN</strong>{{ moneyFormat(total) }}</div>
            <v-icon
              icon="mdi-truck"
              size="large"
              color="success"
            ></v-icon>
            <span class="ml-2 text-h6">{{ moneyFormat(shippingTotal) }}</span>
          </v-card-text>
          <div class="d-flex flex-column align-center justify-center ma-2">
            <v-btn color="success" class="mb-2 shiny-text" block @click="checkout()">{{ translate("checkout") }}</v-btn>
            <v-btn color="grey-lighten-3" block @click="goToCart()">{{ translate("go-cart") }}</v-btn>
          </div>
        </v-card>
      </template>
    </div>
  </v-navigation-drawer>
</template>

<script>
import store from '../../store';
import Quantity from '../Cart/Quantity.vue';
import Table from '../Common/Table.vue';
import CartService from '../../services/CartService';
import Actions from '../Cart/Common/Actions.vue';
import RemoveCartItem from '../Cart/RemoveCartSidebarItemButton.vue';

export default {
  extends: Table,
  // mixins: [Actions],
  components: {Quantity, RemoveCartItem},
  inject: ['strLimit', 'moneyFormat'],
  data() {
    return {
      cartSidebar: false,
      userId: null,
      preventSnackbar: true,
      apiService: CartService,
      cartStatus: "standby",
      event: "update-sidebar-cart-table",
      query: {
        per_page: 100,
        page: 1
      }
    };
  },
  computed: {
    total() {
      return this.items.reduce((acc, item) => {
        let price = Number(String(item.product.price).replace(/,/g, ''));
        return acc + item.quantity * price;
      }, 0);
    },
    shippingTotal() {
      return this.items.reduce((acc, item) => acc + item.quantity * item.product.shipping_price, 0);
    }
  },
  methods: {
    openCartSidebar() {
      this.cartSidebar = true
      this.updateCartsTable()
    },
    closeCartSidebar() {
      this.cartSidebar = false
      this.updateCartsTable()
    },
    updateCartsTable() {
      this.items = null
      this.getItems()
    },
    goToCart() {
      let userId = store.getters['user'].id
      let route = "/cart/" + userId
      return this.$router.push(route)
    },
    checkout() {
      let userIdentifier = `identifier=${this.userId}`
      this.$router.push({ path: `/cart/checkout/${userIdentifier}` });
    }
  },
  mounted() {
    let user = store.getters['user']
    if (!user) return
    this.userId = user.id
    this.query.user_id = this.userId
    this.query.status = this.cartStatus
    this.getItems()
    this.listenEvent("open-sidebar-cart", this.openCartSidebar)
    this.listenEvent("update-cart-total", this.addItem)
    this.listenEvent("update-items-cart-table", this.updateCartsTable)
  },
  beforeDestroy() {
    this.unlistenEvent("open-sidebar-cart", this.openCartSidebar)
    this.unlistenEvent("update-cart-total", this.addItem)
    this.unlistenEvent("update-items-cart-table", this.updateCartsTable)
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  background-color: rgb(207, 207, 207);
}

.v-autocomplete {
  width: 20px;
}

.autocomplete-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-border .v-input__control {
  border: none !important;
  box-shadow: none !important;
}
</style>