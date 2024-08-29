<template>
  <div class="d-flex">
    <v-row dense>
      <v-col cols="10" class="scroll-container-component" style="height: 70vh;">
        <Items />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="2">
        Something
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Responsive from '@/components/Common/Responsive.vue'
import Items from '../components/Cart/Items.vue';

export default {
  extends: Responsive,
  components: {
    Items
  }
}
</script>