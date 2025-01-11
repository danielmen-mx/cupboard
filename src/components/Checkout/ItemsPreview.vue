<template>
  <v-container class="product-preview py-5">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h2 class="text-center mb-5">Your Shopping Cart</h2>

        <!-- Scrollable Product List -->
        <v-sheet
          class="product-list"
          height="300"
          max-height="300"
          elevation="1"
          rounded
        >
          <v-container fluid>
            <v-row>
              <v-col
                v-for="product in products"
                :key="product.id"
                cols="12"
                class="product-item pb-4"
              >
                <v-card class="d-flex align-center" flat>
                  <!-- Product Image -->
                  <v-avatar size="60" class="me-4">
                    <img :src="product.image" :alt="product.name" />
                  </v-avatar>

                  <!-- Product Details -->
                  <v-card-text class="px-0">
                    <div class="product-name">{{ product.name }}</div>
                    <div class="text-caption">
                      <span class="fw-bold">Qty:</span> {{ product.quantity }}
                    </div>
                    <div class="text-caption">
                      <span class="fw-bold">Price:</span> ${{ product.price.toFixed(2) }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ProductPreview",
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Wireless Headphones",
          price: 59.99,
          quantity: 1,
          image:
            "https://via.placeholder.com/60x60?text=Headphones",
        },
        {
          id: 2,
          name: "Smartphone Case",
          price: 19.99,
          quantity: 2,
          image:
            "https://via.placeholder.com/60x60?text=Case",
        },
        {
          id: 3,
          name: "USB-C Cable",
          price: 12.49,
          quantity: 3,
          image:
            "https://via.placeholder.com/60x60?text=Cable",
        },
        {
          id: 4,
          name: "Laptop Stand",
          price: 29.99,
          quantity: 1,
          image:
            "https://via.placeholder.com/60x60?text=Stand",
        },
      ],
    };
  },
};
</script>

<style scoped>
.product-preview {
  width: 50vw;
  margin: auto;
}

.product-list {
  overflow-y: scroll
}

.product-name {
  font-weight: bold;
  font-size: 1rem;
  color: var(--v-theme-on-surface);
}
</style>
