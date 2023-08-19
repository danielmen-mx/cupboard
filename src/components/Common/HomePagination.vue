<template>
  <v-pagination
    v-model="currentPage"
    :length="this.lastPage"
    prev-icon="mdi-menu-left"
    next-icon="mdi-menu-right"
    :total-visible="7"
    rounded="circle"
  ></v-pagination>
</template>
<script>
export default {
  props: {
    pagination_values: {
      type: Object,
      required: false
    }
  },
  data: () => ({
    properties: [],
    currentPage: null,
    lastPage: 0
  }),
  methods: {
    setProperties() {
      let data = this.pagination_values

      this.properties = {
        'items_per_page': parseInt(data.per_page),
        'current_page': parseInt(data.current_page),
        'last_page': parseInt(data.last_page),
        'first_item': parseInt(data.first_item),
        'last_item': parseInt(data.last_item),
        'total_items': parseInt(data.total)
      }

      this.lastPage = this.properties.last_page
      this.currentPage = this.properties.current_page
    },
    dispatchNewProperties() {
      this.fireEvent('updateHomePaginationTable', {
        'per_page': this.properties.items_per_page,
        'page': parseInt(this.currentPage)
      })
    }
  },
  mounted() {
    this.setProperties()
  },
  watch: {
    'currentPage': {
      handler: function () {
        if (this.currentPage === this.properties.current_page) return
        this.dispatchNewProperties()
      }
    }
  }
}
</script>