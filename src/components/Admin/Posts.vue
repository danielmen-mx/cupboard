<template>
  <PostForm :function-file-name="getImageName"/>
  <AdminTableSkeleton v-if="loading" />
  <template v-else>
    <AdminPostsEmptyState v-if="items.length < 1"/>
    <div v-else>
      <div class="d-flex justify-space-between mx-2 my-6">
        <span class="text-h5">{{ translate("posts") }}</span>
        <v-btn
          color="light-green"
          @click="openForm()"
        >
          {{ translate("admin.posts.create") }}
        </v-btn>
      </div>
      <v-card variant="outlined">
        <v-table
          height="64vh"
          fixed-header
          fixed-footer
          class="py-1"
        >
          <thead>
            <tr>
              <template v-for="header in headers" :key="header">
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
                  <td><p class="text-subtitle-1">{{ strLimit(item.name, 25) }}</p></td>
                  <td>{{ item.autor }}</td>
                  <td>
                    <a :href="item.image" class="text-blue-darken-4" target="_blank">{{ getImageName(item.image, item.name) }}</a>
                  </td>
                  <td>
                    <div>
                      <!-- TODO: improve add tooltip to show all the tags in lists(if contain more than 1 tag) -->
                      <v-chip
                        v-if="item.tags"
                        prepend-icon="mdi-label"
                        :color="isHovering ? 'light-blue-darken-3' : 'light-green'"
                        variant="outlined"
                      >
                        {{ countTags(item.tags) }}
                      </v-chip>
                    </div>
                  </td>
                  <td>{{ formatDate(item.created_at) }}</td>
                  <td>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn :class="isHovering ? 'bg-grey-lighten-3' : undefined" icon="mdi-dots-vertical" v-bind="props" variant="flat"></v-btn>
                      </template>
                      <v-list>
                        <v-list-item>
                          <v-list-item-title class="cursor-pointer pb-2" @click="openForm(item)">
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
import PostService from '@/services/PostService.js'
import PostForm from '@/components/Admin/Posts/Form.vue'
import { formatDate, slugify, countArray } from '../../utils/helpers'
import { openConfirmation } from '../Common/Helpers/Actions'
import Table from '@/components/Common/Table.vue'
import AdminPostsEmptyState from '../Common/EmptyState/AdminPostsEmptyState.vue'
import AdminTableSkeleton from '../Common/Skeletons/AdminTableSkeleton.vue'
import AdminPagination from '../Common/Paginations/Admin.vue'

export default {
  extends: Table,
  mixins: [formatDate, slugify, countArray, openConfirmation],
  inject:['strLimit'],
  components: {
    PostForm,
    AdminPostsEmptyState,
    AdminTableSkeleton,
    AdminPagination
  },
  data () {
    return {
      loading: false,
      apiService: PostService,
      items: [],
      post: null,
      event: 'updatePostAdminTable',
      query: {
        per_page: 15,
        page: 1
      },
      headers: [
        "admin.posts.name",
        "autor",
        "admin.posts.asset",
        "admin.posts.tags",
        "table.created_at",
        "options"
      ]
    }
  },
  methods: {
    openForm(item = null) {
      this.$nextTick(() => { this.fireEvent('openPostForm', item) })
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