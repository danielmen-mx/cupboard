<template>
  <div>
    <v-navigation-drawer
      v-model="cartSidebar"
      location="right"
      temporary
      width="400"
      app
    >
      <v-card class="d-flex align-center" flat>
        <v-card-title>Carrito de compras</v-card-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="cartSidebar = false"
          size="x-small"
          flat
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>

      <v-divider></v-divider>

      <v-card
        class="mx-auto"
        max-width="500"
        flat
      >
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.title"
              cols="12"
            >
              <v-card>
                <v-img
                  src=""
                  lazy-src="/logo/shadai-main.jpeg"
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="100px"
                  cover
                >
                  <v-card-title class="text-white" :text="item.title"></v-card-title>
                </v-img>

                <div class="d-flex align-center justify-center ma-2">
                  <span class="text-subtitle-1">Price example</span>
                  <v-spacer></v-spacer>
                  <div class="autocomplete-wrapper">
                    <v-combobox density="compact" :items="[1,2,3,4,5]" class="no-border"></v-combobox>
                  </div>
                  <v-btn icon="mdi-trash-can" :ripple="false" flat></v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <v-card flat>
        <v-card-text>
          <div class="text-h6">MXN {{ moneyFormat(total) }}</div>
        </v-card-text>

        <div class="d-flex flex-column align-center justify-center ma-2">
          <v-btn color="success" class="mb-2" block>Proceder al pago</v-btn>
          <v-btn block>Ir al carrito</v-btn>
        </div>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  inject: ['strLimit', 'moneyFormat'],
  data() {
    return {
      cartSidebar: false,
      items: [
        {
          title: "Producto 1",
          src: "https://via.placeholder.com/150",
          quantity: 2,
          price: 350
        },
        {
          title: "Producto 2",
          src: "https://via.placeholder.com/150",
          quantity: 1,
          price: 500
        },
      ],
    };
  },
  computed: {
    total() {
      return this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }
  },
  methods: {
    removeItem(index) {
      this.items.splice(index, 1);
    },
    openCartSidebar() {
      this.cartSidebar = true
    }
  },
  mounted() {
    this.listenEvent("open-cart-sidebar-test", this.openCartSidebar)
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