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
  <v-app>
    <v-table
      height="500px"
      fixed-header
      class="elevation-1"
    >
      <thead>
        <tr>
          <th>
            Nombre
          </th>
          <th>
            Autor
          </th>
          <th>
            Imagen
          </th>
          <th>
            Tags
          </th>
          <th>
            Creado el
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.autor }}</td>
          <td>{{ item.img }}</td>
          <td>{{ item.tags }}</td>
          <td>{{ item.created_at }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-app>
  <PostForm />
</template>
<script>
import PostService from '@/services/PostService.js'
import PostForm from '@/components/Admin/Posts/Form.vue'

export default {
  components: {
    PostForm
  },
  data () {
    return {
      loading: false,
      apiService: PostService,
      itemsPerPage: 5,
      items: [],
    }
  },
  methods: {
    async getItems() {
      try {
        this.loading = true

        const resp = await this.apiService.index()
        setTimeout(() => {
          this.emitter.emit('snackbarNotify', {color: 'success', message: resp.data.message})
          this.loading = false
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    },
    openDialog() {
      this.emitter.emit('openPostForm')
    }
  },
  mounted() {
    this.getItems()
  },
}
</script>