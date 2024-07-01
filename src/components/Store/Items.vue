<template>
  <!-- empty state -->
  <!-- loading state -->
   <div
    v-for="item in items"
    :key="item.id"
   >
     <v-card
       class="mx-auto my-1"
       max-width="98%"
       elevation="4"
       @click="redirect()"
       hover
     >
       <v-card-item>
         <v-card-title>
           {{ item.name }}
         </v-card-title>
         <v-card-subtitle>
           $ {{ item.price }}
         </v-card-subtitle>
       </v-card-item>
       <v-card-text>
         {{ item.description }}
       </v-card-text>
     </v-card>
   </div>
  <CommonPagination :pagination_values="paginationProps" :per_page="query" />
</template>
<script>
import ProductService from '../../services/ProductService';
import Table from '../Common/Table.vue';
import CommonPagination from '../Common/Paginations/Common.vue';

export default {
  extends: Table,
  components: {
    CommonPagination
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
    }
  },
  mounted() {
    this.getItems()
  },
}
</script>