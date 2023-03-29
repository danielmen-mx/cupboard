<template>
  <!-- Table -->
  <div class="d-flex justify-space-between mx-2">
    <span class="text-h5">Publicaciones</span>
    <!--  -->
    <v-btn
      color="light-green"
      @click="openDialog()"
    >
      Crear Post
    </v-btn>
  </div>
  <v-divider class="my-2 py-2"></v-divider>
  <PostForm :item="post" />
  
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
            <p class="text-subtitle-1">{{ item.name }}</p>
          </td>
          <td>
            {{ item.autor }}
          </td>
          <td>
            <!-- TODO: improve the redirection to the image path -->
            <a href="/NotFound" class="text-blue-darken-4" target="_blank">
              {{ item.image }}
            </a>
          </td>
          <td>
            <div>
              <!-- TODO: improve add tooltip to show all the tags in lists(if contain more than 1 tag) -->
              <v-chip
                v-if="countTags(item.tags)"
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
                  <v-list-item-title class="cursor-pointer pb-2" @click="edit(item)">
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
</template>
<script>
import PostService from '@/services/PostService.js'
import PostForm from '@/components/Admin/Posts/Form.vue'
import { formatDate } from '../../utils/helpers'

export default {
  mixins: [formatDate],
  components: {
    PostForm
  },
  data () {
    return {
      loading: false,
      apiService: PostService,
      itemsPerPage: 5,
      items: [],
      post: null
    }
  },
  methods: {
    async getItems() {
      try {
        this.loading = true

        const resp = await this.apiService.index()

        this.items = resp.data.data
        this.emitter.emit('snackbarNotify', {color: 'success', message: resp.data.message})
        this.loading = false
      } catch (error) {
        console.log(error)
        this.emitter.emit('snackbarNotify', {color: 'error', message: resp.data.error})
      }
    },
    openDialog() {
      this.$nextTick(() => { this.emitter.emit('openPostForm') })
    },
    countTags(tags) {
      let count = Object.values(tags).length

      if (count == 1) return tags[0]
      if (count > 1) return ` +${count} tags`

      return false
    },
    edit(item) {
      // this.post = item
      this.$nextTick(() => { this.emitter.emit('openPostForm', item) })
      // this.$nextTick(() => { this.emitter.emit('openPostForm') })
    },
    async remove(id) {
      try {
        this.loading = true

        const resp = await this.apiService.remove(id)

        this.$nextTick(() => {
          this.emitter.emit('snackbarNotify', {color: 'success', message: resp.data.message})
          this.getItems()
          this.loading = false
        })
      } catch (error) {
        console.log(error)
        this.emitter.emit('snackbarNotify', {color: 'error', message: resp.data.error})
      }
    }
  },
  mounted() {
    this.getItems()
    this.emitter.on('updateTable', this.getItems)
  },
}
</script>