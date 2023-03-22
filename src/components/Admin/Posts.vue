<template>
  <!-- Table -->
  <div class="d-flex justify-space-between mx-2">
    <span class="text-h5">Publicaciones</span>
    <v-btn
      color="light-green"
      @click="openDialog()"
    >
      Crear Post
    </v-btn>
  </div>
  <v-divider class="my-2"></v-divider>
  <v-card>
    <v-table
      height="300px"
      fixed-header
    >
      <thead>
        <tr class="text-subtitle-1">
          <th>Nombre</th>
          <th>Autor</th>
          <th>Imagen</th>
          <th>Tags</th>
          <th>Creado el</th>
          <th>Opciones</th>
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
            <a :href="item.image" class="text-blue-darken-4" target="_blank">
              {{ item.image }}
            </a>
          </td>
          <td>
            <div class="d-flex justify-space-between">
              <v-chip
                v-for="(tag, i) in item.tags"
                variant="outlined"
                color="success"
                label
              >
                <v-icon start icon="mdi-label"></v-icon>
                {{ tag }}
              </v-chip>
            </div>
          </td>
          <td>
            {{ formatDate(item.created_at) }}
          </td>
          <td class="text-center">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props" variant="flat"></v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(action, index) in actions"
                  :key="index"
                >
                  <v-list-item-title class="cursor-pointer">
                    {{ action.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <PostForm />
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
      actions: [
        { title: 'Editar' },
        { title: 'Eliminar' },
      ],
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
      this.emitter.emit('openPostForm')
    },
    separateTags(array) {
      let json = JSON.stringify(array)
      console.log(json)
    }
  },
  mounted() {
    this.getItems()
  },
}
</script>