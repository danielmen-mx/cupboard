<template>
  <StoreItemSkeleton v-if="loading"/>
  <template v-else>
    <StoreItemEmptyState v-if="items.length == 0"/>
    <div v-else>
      <template v-for="item in items" :key="item.id">
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              v-bind="props"
              :color="isHovering ? 'amber' : undefined"
              class="mx-auto my-1"
              max-width="98%"
              elevation="4"
            >
              <div class="d-flex">
                <v-row dense>
                  <v-col cols="3">
                    <v-img
                      :src="item.image"
                      lazy-src="/logo/shadai-main.jpeg"
                      class="fill-height cursor-pointer"
                      @click="redirect(item.id)"
                      cover
                    ></v-img>
                  </v-col>
                  <v-col cols="9">
                    <div>
                      <v-card-item>
                        <v-card-title>{{ item.name }}</v-card-title>
                        <v-card-subtitle v-if="item.stock > 0" class="d-flex">
                          <span>MXN$ {{ moneyFormat(item.price) }}</span>
                          &nbsp;&nbsp;
                          <span>{{ item.stock }} {{ translate("store-module.available-items").toLowerCase() }}</span>
                        </v-card-subtitle>
                        <v-card-subtitle v-else class="d-flex">
                          <span class="text-decoration-line-through">MXN$ {{ moneyFormat(item.price) }}</span>
                          &nbsp;&nbsp;
                          <span class="font-weight-black text-red">{{ translate("store-module.out-of-stock") }}</span>
                        </v-card-subtitle>
                      </v-card-item>
                      <v-card-text>{{ removeHtmlTags(item.description) }}</v-card-text>
                    </div>
                    <div class="pb-2">
                      <ItemsActions :parent_item="item" />
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </template>
        </v-hover>
      </template>
      <v-divider></v-divider>
      <CommonPagination :pagination_values="paginationProps" :per_page="query" />
    </div>
  </template>
</template>
<script>
import ProductService from '../../services/ProductService';
import ItemsActions from './Actions/Items.vue';
import Table from '../Common/Table.vue';
import CommonPagination from '../Common/Paginations/Common.vue';
import StoreItemSkeleton from '../Common/Skeletons/StoreItemSkeleton.vue';
import StoreItemEmptyState from '../Common/EmptyState/StoreItemEmptyState.vue';

export default {
  mixins: [Table],
  inject: ['strLimit','removeHtmlTags', 'moneyFormat'],
  components: {
    CommonPagination,
    StoreItemSkeleton,
    StoreItemEmptyState,
    ItemsActions
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
    redirect(id) {
      this.$router.push({ path: '/store/item/' + id })
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