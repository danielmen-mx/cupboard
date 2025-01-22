<template>
  <v-row justify="center" class="mt-1" no-gutters>
    <v-col cols="12" >
      <h2 class="mx-3 mb-2 text-gradient shaddai-font">Check your items in the cart</h2>
      <v-divider class="mx-3"></v-divider>
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
    </v-col>
  </v-row>
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
            "",
        },
        {
          id: 2,
          name: "Smartphone Case",
          price: 19.99,
          quantity: 2,
          image:
            "https://wpassets.halowaypoint.com/wp-content/2021/12/HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg",
        },
        {
          id: 3,
          name: "USB-C Cable",
          price: 12.49,
          quantity: 3,
          image:
            "https://wpassets.halowaypoint.com/wp-content/2021/12/HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg",
        },
        {
          id: 4,
          name: "Laptop Stand",
          price: 29.99,
          quantity: 1,
          image:
            "https://wpassets.halowaypoint.com/wp-content/2021/12/HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg",
        },
        {
          id: 1,
          name: "Wireless Headphones",
          price: 59.99,
          quantity: 1,
          image:
            "",
        },
        {
          id: 2,
          name: "Smartphone Case",
          price: 19.99,
          quantity: 2,
          image:
            "https://wpassets.halowaypoint.com/wp-content/2021/12/HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg",
        },
        {
          id: 3,
          name: "USB-C Cable",
          price: 12.49,
          quantity: 3,
          image:
            "https://wpassets.halowaypoint.com/wp-content/2021/12/HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg",
        },
        {
          id: 4,
          name: "Laptop Stand",
          price: 29.99,
          quantity: 1,
          image:
            "https://wpassets.halowaypoint.com/wp-content/2021/12/HaloInfinite_CampaignKeyArt_CLEAN_1920x1080.jpg",
        },
      ],
    };
  },
};
</script>
<style scoped>
.text-gradient {
  background: linear-gradient(to right, #bb750c, rgba(209, 121, 20, 0.089)); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>