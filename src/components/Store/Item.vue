<template>
  <StoreShowItemSkeleton v-if="loading" />
  <template v-else>
    <ItemNotFound v-if="!item" />
    <div v-else class="d-flex">
      <v-row dense>
        <v-col cols="8">
          <v-card height="51vh">
            <v-img
              :src="item.image"
              lazy-src="/logo/shadai-main.jpeg"
              cover
              class="w-auto fill-height bottom-gradient"
            ></v-img>
          </v-card>
          <div class="my-2"></div>
          <v-card height="12.8vh">
            <div class="text-h6 px-2">{{ translate("description") }}</div>
            <div class="px-2">{{ removeHtmlTags(item.description) }}</div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="64.5vh" class="text-h6 px-2 d-flex flex-column justify-space-between" overflow>
            <div>
              <div class="d-flex justify-space-between">
                <span class="align-self-center text-caption text-decoration-underline">
                  {{ translate("new") }}+
                </span>
                <Actions :parent_model="item"/>
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
            <div class="d-flex font-size-md font-weight-black flex-row-reverse text-right py-2 pr-2 text-blue-darken-4">
              MXN {{ moneyFormat(totalAmount) }}
            </div>
            <section>
              <ItemActions
                :parent_item="item"
                :parent_quantity="unitsToBePurchased"
              />
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
import ItemNotFound from '@/components/Store/ItemNotFound.vue'
import StoreShowItemSkeleton from '../Common/Skeletons/StoreShowItemSkeleton.vue';
import ProductService from '../../services/ProductService';
import { moneyFormat } from '../../utils/helpers'
import Ratings from '../Common/Ratings.vue';
import Table from '../Common/Table.vue';
import Actions from './Reactions.vue';
import ItemActions from './Actions/Item.vue';

export default {
  extends: Table,
  components: { StoreShowItemSkeleton, Ratings, Actions, ItemNotFound, ItemActions },
  mixins: [moneyFormat],
  inject: ['removeHtmlTags', 'strLimit'],
  data() {
    return {
      apiService: ProductService,
      preventSnackbar: true,
      unitsToBePurchased: 1 + " " + this.translate("units").toLowerCase()
    }
  },
  methods: {
    //
  },
  computed: {
    totalAmount () {
      let subtotal = parseInt(this.item.price, 10) + parseInt(this.item.shipping_price, 10)
      let qty = parseInt(this.unitsToBePurchased.replace(/[^0-9]/g, ''), 10)

      return subtotal * qty
    },
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
    this.loading = false
    this.getItem()
    this.listenEvent("refresh-store-items", this.getItem)
  },
  beforeDestroy() {
    this.unlistenEvent("refresh-store-items", this.getItem)
  },
}
</script>