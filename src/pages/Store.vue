<template>
  <v-card class="elevation-0">
    <Item/>
  </v-card>
</template>
<script>
import Responsive from '@/components/Common/Responsive.vue'
import Item from '../components/Store/Item.vue';

export default {
  extends: Responsive,
  components: {
    Item
  }
}
</script>