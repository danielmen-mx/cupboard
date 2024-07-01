<template>
  <v-card class="elevation-0">
    <div class="d-flex mb-2">
      <v-row dense>
        <v-col cols="3">
          <v-card
            height="10vh"
            elevation="0"
            class="d-flex justify-center"
          >
            <v-card-title
              class="align-self-center"
            >Store</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="9" class="d-flex align-center">
          <v-card
            color="secondary"
            height="8vh"
            width="100%"
          >
            <v-card-title>Offers component</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-divider></v-divider>

    <div class="d-flex my-4">
      <v-row dense>
        <v-col cols="3">
          <v-card
            color="secondary"
            height="75vh"
          >
            <v-card-title>Filters</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="9" class="store-items-container">
          <Items />
          <!-- <CommonPagination /> -->
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script>
import Responsive from '@/components/Common/Responsive.vue'
import Items from '../components/Store/Items.vue';
import CommonPagination from '../components/Common/Paginations/Common.vue';

export default {
  extends: Responsive,
  components: {
    Items,
    CommonPagination
  }
}
</script>
<style>
.store-items-container {
  height: 75.5vh;
  -ms-overflow-style: none;
  overflow-y: scroll;
}

.store-items-container::-webkit-scrollbar {
  display: none;
}
</style>