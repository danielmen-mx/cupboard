<template>
  <v-btn @click="fireCarSidebarEvent()" color="primary">
    Ver carrito
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      cartSidebar: false,
      
    };
  },
  methods: {
    fireCarSidebarEvent() {
      this.fireEvent("open-sidebar-cart-test")
    }
  },
};
</script>

<style scoped>
.v-navigation-drawer {
  background-color: white;
}
</style>
