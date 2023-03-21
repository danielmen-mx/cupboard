<template>
  <v-tabs
    v-model="tab"
    bg-color="light-green"
  >
    <v-tab value="setting">Personal settings</v-tab>
    <v-tab value="posts">Posts</v-tab>
    <v-tab value="catalogue">Catalogue</v-tab>
  </v-tabs>

  <v-card-text>
    <v-window v-model="tab">
      <v-window-item value="setting">
        <Settings />
      </v-window-item>
      <v-window-item value="posts">
        <Posts />
      </v-window-item>
      <v-window-item value="catalogue">
        <Products />
      </v-window-item>
    </v-window>
  </v-card-text>
</template>
<script>
import Settings from '@/components/Admin/Settings.vue'
import Posts from '@/components/Admin/Posts.vue'
import Products from '@/components/Admin/Products.vue'

export default {
  components: {
      Settings,
      Posts,
      Products
    },
    data: () => ({
      tab: null,
    }),
  }
</script>