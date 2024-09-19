<template>
  <div>
    <v-navigation-drawer
      v-model="cartSidebar"
      location="right"
      temporary
      width="400"
      app
    >
      <v-toolbar flat dense>
        <v-toolbar-title>Carrito de compras</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="cartSidebar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="(item, index) in cartItems" :key="index">
          <v-img :src="item.image"></v-img>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>
              Cantidad: {{ item.quantity }} | Precio: {{ item.price }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="removeItem(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-card flat>
        <v-card-text>
          <div class="text-h6">Total: {{ total }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" block>Proceder al pago</v-btn>
        </v-card-actions>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartSidebar: false,
      cartItems: [
        {
          name: "Producto 1",
          image: "https://via.placeholder.com/150",
          quantity: 2,
          price: 350
        },
        {
          name: "Producto 2",
          image: "https://via.placeholder.com/150",
          quantity: 1,
          price: 500
        },
      ],
    };
  },
  computed: {
    total() {
      return this.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }
  },
  methods: {
    removeItem(index) {
      this.cartItems.splice(index, 1);
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
  background-color: white;
}
</style>
