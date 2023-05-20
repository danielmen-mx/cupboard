<template>
  <v-data-iterator :items="items" :page="page">
    <template v-slot:default="{ items }">
      <template
        v-for="(item, i) in items"
        :key="i"
      >
        <v-card v-bind="item.raw"></v-card>

        <br>
      </template>
    </template>
  </v-data-iterator>
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