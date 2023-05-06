<template>
  <PostForm :function-file-name="getImageName"/>
  <AdminPostsSkeleton v-if="loading" />
  <template v-else>
    <AdminPostsEmptyState v-if="items.length < 1"/>
    <div v-else>
      <div class="d-flex justify-space-between mx-2 my-6">
        <span class="text-h5">Publicaciones</span>
        <v-btn
          color="light-green"
          @click="openForm()"
        >
          Crear Post
        </v-btn>
      </div>
      <v-card variant="outlined">
        <v-table
          height="64vh"
          fixed-header
          class="py-1"
        >
          <thead>
            <tr class="text-subtitle-1">
              <th>Nombre</th>
              <th>Autor</th>
              <th>Imagen</th>
              <th>Tags</th>
              <th>Creado el</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>
                <p class="text-subtitle-1">{{ strLimit(item.name, 25) }}</p>
              </td>
              <td>
                {{ item.autor }}
              </td>
              <td>
                <!-- TODO: improve the redirection to the image path -->
                <a :href="item.image" class="text-blue-darken-4" target="_blank">
                  {{ getImageName(item.image, item.name) }}
                </a>
              </td>
              <td>
                <div>
                  <!-- TODO: improve add tooltip to show all the tags in lists(if contain more than 1 tag) -->
                  <v-chip
                    v-if="item.tags"
                    prepend-icon="mdi-label"
                    color="light-green"
                    variant="outlined"
                  >
                    {{ countTags(item.tags) }}
                  </v-chip>
                </div>
              </td>
              <td>
                {{ formatDate(item.created_at) }}
              </td>
              <td>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn icon="mdi-dots-vertical" v-bind="props" variant="flat"></v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title class="cursor-pointer pb-2" @click="openForm(item)">
                        Editar
                      </v-list-item-title>
                      <v-list-item-title class="cursor-pointer pt-2" @click="remove(item.id)">
                        Eliminar
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </div>
  </template>
</template>
<script>
import PostService from '@/services/PostService.js'
import PostForm from '@/components/Admin/Posts/Form.vue'
import { formatDate, slugify, countArray } from '../../utils/helpers'
import Table from '@/components/Common/Table.vue'
import AdminPostsEmptyState from '../Common/EmptyState/AdminPostsEmptyState.vue'
import AdminPostsSkeleton from '../Common/Skeletons/AdminPostsSkeleton.vue'

export default {
  extends: Table,
  mixins: [formatDate, slugify, countArray],
  inject:['strLimit'],
  components: {
    PostForm,
    AdminPostsEmptyState,
    AdminPostsSkeleton
  },
  data () {
    return {
      loading: false,
      apiService: PostService,
      itemsPerPage: 5,
      items: [],
      post: null,
      event: 'updateAdminTable'
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
    }
  },
  mounted() {
    this.getItems()
    this.listenEvent(this.event, this.getItems)
  },
}
</script>