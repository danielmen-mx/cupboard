<template>
  <StoreItemSkeleton v-if="loading"/>
   <template v-else>
    <StoreItemEmptyState v-if="items.length == 0"/>
    <div v-else>
      <v-card
        v-for="item in items"
        :key="item.id"
        class="mx-auto my-1"
        max-width="98%"
        elevation="4"
        @click="redirect()"
        hover
      >
        <div class="d-flex">
          <v-row dense>
            <v-col cols="3">
              <v-img
                :src="item.image"
                lazy-src="/logo/shadai-main.jpeg"
                cover
              ></v-img>
            </v-col>
            <v-col cols="9">
              <v-card-item>
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-subtitle>
                  $ {{ item.price }}
                </v-card-subtitle>
              </v-card-item>
              <v-card-text>
                {{ removeHtmlTags(item.description) }}
              </v-card-text>
            </v-col>
          </v-row>
        </div>
      </v-card>
      <v-divider></v-divider>
      <CommonPagination :pagination_values="paginationProps" :per_page="query" />
    </div>
   </template>
</template>
<script>
import ProductService from '../../services/ProductService';
import Table from '../Common/Table.vue';
import CommonPagination from '../Common/Paginations/Common.vue';
import StoreItemSkeleton from '../Common/Skeletons/StoreItemSkeleton.vue';
import StoreItemEmptyState from '../Common/EmptyState/StoreItemEmptyState.vue';

export default {
  mixins: [Table],
  inject: ['strLimit','removeHtmlTags'],
  components: {
    CommonPagination,
    StoreItemSkeleton,
    StoreItemEmptyState
  },
  data() {
    return {
      loading: false,
      apiService: ProductService,
      items: [],
      configuration: {},
      preventSnackbar: true,
      query: {
        per_page: 10,
        page: 1
      }
    }
  },
  methods: {
    redirect() {
      // window.alert("UR joking around")
      console.log("still building ur dreams babe")
    },
    updatePagination(properties) {
      if (this.query.per_page === properties.per_page && this.query.page === properties.page) return
      this.query = properties
      this.getItems()
    }
  },
  mounted() {
    this.getItems()
    this.listenEvent("refresh-store-items-component", this.getItems)
    this.listenEvent('update-store-pagination-component', this.updatePagination)
  },
  beforeDestroy() {
    this.listenEvent("refresh-store-items-component", this.getItems)
    this.unlistenEvent('update-store-pagination-component', this.updatePagination)
  },
}
</script>