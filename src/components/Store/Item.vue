<template>
  <StoreShowItemSkeleton v-if="loading" />
  <template v-else>
    <div v-if="!item">
      Ups, no item found
    </div>
    <div v-else class="d-flex">
      <v-row dense>
        <v-col cols="8">
          <v-card height="52.2vh">
            <v-img
              :src="item.image"
              lazy-src="/logo/shadai-main.jpeg"
              cover
              class="w-auto"
            ></v-img>
          </v-card>
          <div class="my-2"></div>
          <v-card height="12.8vh">
            <div class="text-h6 px-2">{{ translate("description") }}</div>
            <div class="px-2">{{ removeHtmlTags(item.description) }}</div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="65.8vh" class="text-h6 px-4 d-flex flex-column justify-space-between" overflow>
            <div>
              <div class="d-flex justify-space-between">
                <span class="align-self-center text-caption text-decoration-underline">
                  {{ translate("new") }}+
                </span>
                <v-avatar
                  color="pink-lighten-1"
                  size="30"
                >
                  <v-icon
                    class="pa-2 cursor-pointer"
                    size="small"
                  >mdi-heart</v-icon>
                </v-avatar>
              </div>
              <div class="mt-2 text-h5 font-weight-black">{{ strLimit(item.name, 31) }}</div>
              <Ratings class="mb-6" :parent_rating="item.rating" />
              <div class="text-light-green font-weight-bold text-h4">${{item.price}}</div>
              <div class="text-caption text-grey pt-4">{{translate("shipping-price")}}</div>
              <div class="text-light-green text-h5">${{item.shipping_price}}</div>
              <div class="d-flex justify-space-between py-6 px-1">
                <span class=" text-button mr-4">{{ translate("quantity") }}:</span>
                <v-select
                  v-model="unitsToBePurchased"
                  density="compact"
                  :items="stockAvailable"
                  variant="outlined"
                ></v-select>
              </div>
            </div>
            <v-spacer></v-spacer>
            <section class="d-flex flex-column my-2">
              <v-btn 
                class="my-2 mt-auto"
                color="light-green"
              >{{ translate("buy-now") }}</v-btn>
              <v-btn
                class="my-2 mt-auto"
                color="blue-darken-1"
                variant="tonal"
              >{{ translate("add-cart") }}</v-btn>
            </section>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-divider class="my-4"></v-divider>
    <div>another component soon</div>
  </template>
</template>
<script>
import ProductService from '../../services/ProductService';
import StoreShowItemSkeleton from '../Common/Skeletons/StoreShowItemSkeleton.vue';
import Table from '../Common/Table.vue';
import Ratings from '../Common/Ratings.vue';

export default {
  extends: Table,
  components: { StoreShowItemSkeleton, Ratings },
  inject: ['removeHtmlTags', 'strLimit'],
  data() {
    return {
      apiService: ProductService,
      preventSnackbar: true,
      unitsToBePurchased: 1 + " " + this.translate("units").toLowerCase()
    }
  },
  methods: {
  },
  computed: {
    stockAvailable() {
      let stock = parseInt(this.item.stock, 10)
      let count = []
      if (isNaN(stock) || stock < 1) {
        this.unitsToBePurchased = 0 + " " + this.translate("units").toLowerCase()
        return []
      }
      for (let i = 1; i <= stock; i++) {
        let str = i + " " + this.translate("units").toLowerCase()
        count.push(str)
      }

      return count
    }
  },
  mounted() {
    // TODO: if the $route.params.id is undefined or null must send us to another component called itemNotFound wich show that the product is already out, or dont exists
    if (!this.$route.params.id) return this.$router.push("store")
    this.itemId = this.$route.params.id

    this.getItem()
  },
}
</script>