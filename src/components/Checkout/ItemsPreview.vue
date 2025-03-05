<template>
  <div v-if="loading">
    <skeletonloader />
  </div>
  <div v-else>
    <v-row justify="center" class="mt-1" no-gutters>
      <v-col cols="12" >
        <h2 class="mx-3 mb-2 orange-text-gradient shaddai-font">Check your items in the cart</h2>
        <v-divider class="mx-3"></v-divider>

        <div v-if="products.length === 0" class="text-center">
          <v-img
            src="/logo/empty-cart.svg"
            alt="Empty cart"
            width="20vw"
          ></v-img>
          <p class="text-caption">Your cart is empty</p>
        </div>

        <div v-else>
          <v-sheet
            class="scroll-container-component pa-2"
            height="71vh"
          >
            <v-row no-gutters>
              <v-col
                v-for="product in products"
                :key="product.id"
                cols="12"
                class="my-1"
              >
                <v-card class="d-flex align-center px-2" elevation="2" flat>
                  <v-avatar size="60" class="me-4">
                    <v-img
                      :src="product.image"
                      :alt="product.name"
                      lazy-src="/logo/shadai-main.jpeg"
                      cover
                    />
                  </v-avatar>
                  <v-card-text class="px-2">
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
          </v-sheet>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import skeletonloader from '../Common/Skeletons/CheckoutItemsPreviewSkeleton.vue';

export default {
  name: "ProductPreview",
  components: {
    skeletonloader,
  },
  data() {
    return {
      products: [],
      loading: true,
    };
  },
};
</script>
