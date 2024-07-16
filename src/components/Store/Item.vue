<template>
  <StoreShowItemSkeleton v-if="loading" />
  <template v-else>
    <div v-if="!item">
      Ups, no item found
    </div>
    <div v-else class="d-flex">
      <v-row dense>
        <v-col cols="8">
          <v-card height="50vh">
            <v-img
              :src="item.image"
              lazy-src="/logo/shadai-main.jpeg"
              cover
              class="w-auto"
            ></v-img>
          </v-card>
          <div class="my-2"></div>
          <v-card height="10vh">
            <div class="text-h6 px-2">{{ translate("product-information") }}</div>
            <div class="px-2">{{ removeHtmlTags(item.description) }}</div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="60.8vh" class="text-h6 px-4">
            <div class="mt-2 text-h5 font-weight-black">{{ item.name }}</div>
            <Ratings class="mb-6" :parent_rating="item.rating" />
            <!-- <div class="text-h6">{{translate("price")}} : <strong class="text-light-green text-h4 font-weight-bold">${{item.price}}</strong></div> -->
            <!-- <div class="text-caption">{{translate("price")}}</div> -->
            <div class="text-light-green font-weight-bold text-h4">${{item.price}}</div>
            <div class="text-caption text-grey pt-4">{{translate("shipping-price")}}</div>
            <div class="text-light-green text-h5">${{item.shipping_price}}</div>
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
  inject: ['removeHtmlTags'],
  data() {
    return {
      apiService: ProductService,
      preventSnackbar: true
    }
  },
  methods: {
    
  },
  mounted() {
    // TODO: if the $route.params.id is undefined or null must send us to another component called itemNotFound wich show that the product is already out, or dont exists
    if (!this.$route.params.id) return this.$router.push("store")
    this.itemId = this.$route.params.id

    this.getItem()
  },
}
</script>