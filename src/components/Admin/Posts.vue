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
  <v-card color="red">
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
          <th>
            Opciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.autor }}</td>
          <td>{{ item.image }}</td>
          <td>{{ item.tags }}</td>
          <td>{{ formatDate(item.created_at) }}</td>
          <td>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item >
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item >
                  <v-list-item-title>Delete</v-list-item-title>
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
    }
  },
  methods: {
    async getItems() {
      try {
        this.loading = true

        const resp = await this.apiService.index()
        console.log(resp.data.data)
        this.items = resp.data.data
        this.emitter.emit('snackbarNotify', {color: 'success', message: resp.data.message})
        this.loading = false
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