<template>
  <AdminTableSkeleton v-if="loading" />
  <template v-else>
    <AdminProductsEmptyState v-if="items.length < 1"/>
    <div v-else>
      <div class="d-flex justify-space-between mx-2 my-6">
        <span class="text-h5">{{ translate("products") }}</span>
        <v-btn
          color="light-green"
          @click="openDrawer()"
        >
          {{ translate("admin.products.create") }}
        </v-btn>
      </div>
      <v-card
        variant="outlined"
      >
        <v-table
          height="64vh"
          fixed-header
          fixed-footer
          class="py-1"
        >
          <thead>
            <tr>
              <template v-for="header in headers" :key="header" >
                <th class="text-subtitle-1 font-weight-bold">{{ translate(header) }}</th>
              </template>
            </tr>
          </thead>
          <tbody>
            <template v-for="item in items" :key="item.name">
              <v-hover v-slot="{ isHovering, props }">
                <tr
                  v-bind="props"
                  :class="isHovering ? 'bg-grey-lighten-3' : undefined"
                >
                  <td>
                    <v-tooltip v-if="item.name.length > 30" location="bottom">
                      <template v-slot:activator="{ props }">
                        <p
                          class="text-subtitle-1"
                          v-bind="props"
                        >{{ strLimit(item.name, 30) }}</p>
                      </template>
                      <span>{{ item.name }}</span>
                    </v-tooltip>
                    <p v-else class="text-subtitle-1">{{ strLimit(item.name, 30) }}</p>
                  </td>
                  <td>${{ item.price }}</td>
                  <td>${{ item.shipping_price }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>
                    <v-tooltip v-if="item.description.length > 40" location="bottom">
                      <template v-slot:activator="{ props }">
                        <p
                          v-bind="props"
                        >{{ strLimit(item.description, 40) }}</p>
                      </template>
                      <span>{{ item.description }}</span>
                    </v-tooltip>
                    <p v-else>{{ strLimit(item.description, 40) }}</p>
                  </td>
                  <td>
                    <a :href="item.assets" class="text-blue-darken-4" target="_blank">
                      {{ getImageName(item.assets, item.name) }}
                    </a>
                  </td>
                  <td>{{ formatDate(item.created_at) }}</td>
                  <td>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn :class="isHovering ? 'bg-grey-lighten-3' : undefined" icon="mdi-dots-vertical" v-bind="props" variant="flat"></v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title class="cursor-pointer pb-2" @click="editItem(item)">
                            {{ translate("edit") }}
                          </v-list-item-title>
                          <v-list-item-title class="cursor-pointer pt-2" @click="openConfirmation(item.id)">
                            {{ translate("delete") }}
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </v-hover>
            </template>
          </tbody>
        </v-table>
        <v-divider></v-divider>
        <AdminPagination :pagination_values="paginationProps" :per_page="query"/>
      </v-card>
    </div>
  </template>
</template>
<script>
import ProductService from '@/services/ProductService'
import PostForm from '@/components/Admin/Posts/Form.vue'
import { formatDate, slugify, countArray } from '../../utils/helpers'
import { openConfirmation } from '../Common/Helpers/Actions'
import Table from '@/components/Common/Table.vue'
import AdminProductsEmptyState from '../Common/EmptyState/AdminProductsEmptyState.vue'
import AdminTableSkeleton from '../Common/Skeletons/AdminTableSkeleton.vue'
import AdminPagination from '../Common/Paginations/Admin.vue'

export default {
  extends: Table,
  mixins: [formatDate, slugify, countArray, openConfirmation],
  inject:['strLimit'],
  components: {
    PostForm,
    AdminProductsEmptyState,
    AdminTableSkeleton,
    AdminPagination
  },
  data () {
    return {
      loading: false,
      apiService: ProductService,
      items: [],
      post: null,
      event: 'updateProductAdminTable',
      query: {
        per_page: 15,
        page: 1
      },
      headers: [
        "admin.products.table_headers.name",
        "admin.products.table_headers.price",
        "admin.products.table_headers.shipping_price",
        "admin.products.table_headers.stock",
        "admin.products.table_headers.description",
        "admin.products.table_headers.asset",
        "table.created_at",
        "table.options",
      ]
    }
  },
  methods: {
    editItem(item) {
      if (!item) return
      let path = '/admin/products/edit/' + item.id;
      this.$router.push({ path: path })
      setTimeout(() => { this.fireEvent('openDrawer') }, 100);
    },
    openDrawer(item = null) {
      this.$router.push({ path: '/admin/products/create' })
      setTimeout(() => { this.fireEvent('openDrawer', item) }, 100);
    },
    countTags(tags) {
      let count = this.countArray(tags)

      if (count == 1) return tags[0]
      if (count > 1) return ` +${count} tags`

      return false
    },
    getImageName(imageName, postName) {
      if (!imageName) return

      let split = imageName.split('/')
      return split[split.length - 1]
    },
    updatePagination(properties) {
      if (this.query.per_page === properties.per_page && this.query.page === properties.page) return
      this.query = properties
      this.getItems()
    }
  },
  mounted() {
    this.getItems()
    this.listenEvent(this.event, this.getItems)
    this.listenEvent('updatePaginationTable', this.updatePagination)
    this.listenEvent('deletion-confirmation', this.remove)
  },
  beforeDestroy() {
    this.unlistenEvent(this.event, this.getItems)
    this.unlistenEvent('updatePaginationTable', this.updatePagination)
    this.unlistenEvent('deletion-confirmation', this.remove)
  },
}
</script>
<style>
.column-table {
  text-align: center !important;
}
</style>