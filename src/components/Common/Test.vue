<template>
  <!-- <div class="d-flex">
    <v-avatar class="skeleton my-2 mr-2" size="45" height="5vh"></v-avatar>
    <div class="d-flex flex-column justify-space-between">
      <v-sheet class="skeleton rounded ma-1 pa-1 mt-2" height="2vh" width="7vw"></v-sheet>
      <v-sheet class="skeleton rounded ma-1 pa-1 mb-2" height="2vh" width="3vw"></v-sheet>
    </div>
    <v-spacer></v-spacer>
    <div class="d-flex align-center justify-center">
      <v-icon class="me-1" icon="mdi-heart" color="grey-darken-1"></v-icon>
      <span class="me-2" color="grey-darken-1">0</span>
      <span class="me-1" color="grey-darken-1">·</span>
      <v-icon class="me-1" icon="mdi-comment" color="grey-darken-1"></v-icon>
      <span class="subheading me-2">0</span>
    </div>
  </div> -->
  <p>Something</p>
  <p>{{ $t('nav.admin') }}</p>
</template>
<script>
export default {
  data: () => ({
    page: 1,
    items: Array.from({ length: 15 }, (k, v) => ({
      title: 'Item ' + v + 1,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
    })),
  }),
}
</script>