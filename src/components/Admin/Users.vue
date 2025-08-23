<template>
  <AdminTableSkeleton v-if="loading" />
  <template v-else>
    <AdminItemsTableEmptyState v-if="items.length < 1" itemType="users"/>
    <div v-else>
      <div class="d-flex justify-space-between mx-2 my-6">
        <span class="text-h5">{{ translate("users") }}</span>
        
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
            <template v-for="item in items" :key="item.id">
              <v-hover v-slot="{ isHovering, props }">
                <tr
                  v-bind="props"
                  :class="isHovering ? 'bg-grey-lighten-3' : undefined"
                >
                  <td>
                    <v-tooltip v-if="item.username.length > 15" location="bottom">
                      <template v-slot:activator="{ props }">
                        <p
                          class="text-subtitle-1"
                          v-bind="props"
                        >{{ strLimit(item.username, 15) }}</p>
                      </template>
                      <span>{{ item.username }}</span>
                    </v-tooltip>
                    <p v-else class="text-subtitle-1">{{ strLimit(item.username, 15) }}</p>
                  </td>
                  <td>
                    <v-tooltip v-if="item.email.length > 20" location="bottom">
                      <template v-slot:activator="{ props }">
                        <p
                          class="text-subtitle-1"
                          v-bind="props"
                        >{{ strLimit(item.email, 20) }}</p>
                      </template>
                      <span>{{ item.email }}</span>
                    </v-tooltip>
                    <p v-else class="text-subtitle-1">{{ strLimit(item.email, 20) }}</p>
                  </td>
                  <td>{{ item.first_name }}</td>
                  <td>{{ item.last_name }}</td>
                  <td class="text-center">{{ item.language }}</td>
                  <td>🔒 Secret</td>
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
                          <v-list-item-title class="cursor-pointer pt-2" @click.stop="requestUserRemoval(user.id, item.id, apiService, 'remove-item-users-table')">
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
import UserService from '@/services/UserService'
import PostForm from '@/components/Admin/Posts/Form.vue'
import { formatDate, slugify, countArray } from '../../utils/helpers'
import { requestUserRemoval } from '../Common/Helpers/Actions'
import Table from '@/components/Common/Table.vue'
import AdminItemsTableEmptyState from '../Common/EmptyState/AdminItemsTableEmptyState.vue'
import AdminTableSkeleton from '../Common/Skeletons/AdminTableSkeleton.vue'
import AdminPagination from '../Common/Paginations/Admin.vue'
import store from '@/store'

export default {
  extends: Table,
  mixins: [formatDate, slugify, countArray, requestUserRemoval],
  inject:['strLimit'],
  components: {
    PostForm,
    AdminItemsTableEmptyState,
    AdminTableSkeleton,
    AdminPagination
  },
  data () {
    return {
      loading: false,
      apiService: UserService,
      user: null,
      items: [],
      post: null,
      event: 'updateUserAdminTable',
      query: {
        per_page: 15,
        page: 1
      },
      headers: [
        "admin.users.table_headers.username",
        "admin.users.table_headers.email",
        "admin.users.table_headers.firstname",
        "admin.users.table_headers.lastname",
        "admin.users.table_headers.language",
        "admin.users.table_headers.password",
        "table.created_at",
        "table.options",
      ]
    }
  },
  methods: {
    editItem(item) {
      if (!item) return
      let path = '/admin/users/edit/' + item.id;
      this.$router.push({ path: path })
      setTimeout(() => { this.fireEvent('openDrawer') }, 100);
    },
    openDrawer(item = null) {
      this.$router.push({ path: '/admin/users/create' })
      setTimeout(() => { this.fireEvent('openDrawer', item) }, 100);
    },
    updatePagination(properties) {
      if (this.query.per_page === properties.per_page && this.query.page === properties.page) return
      this.query = properties
      this.getItems()
    }
  },
  mounted() {
    this.user = store.getters['user']
    this.getItems()
    this.listenEvent(this.event, this.addItem)
    this.listenEvent('remove-item-users-table', this.removeItem)
    this.listenEvent('updatePaginationTable', this.updatePagination)
  },
  beforeDestroy() {
    this.unlistenEvent('remove-item-users-table', this.removeItem)
    this.unlistenEvent(this.event, this.addItem)
    this.unlistenEvent('updatePaginationTable', this.updatePagination)
  },
}
</script>
<style>
.column-table {
  text-align: center !important;
}
</style>