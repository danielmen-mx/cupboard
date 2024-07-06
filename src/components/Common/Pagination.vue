<template></template>
<script>
export default {
  props: {
    pagination_values: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    properties: [],
    pageRequested: null,
    currentPage: null,
    lastPage: 0
  }),
  computed: {
    backDisabled() {
      if (this.properties.current_page == 1) return true

      return false
    },
    forwardDisabled() {
      if (this.properties.current_page === this.properties.last_page) return true

      return false
    },
    itemsPerPageDisabled() {
      // TODO: avoid that the elements per page can be modified if the number of elements is greater than the rest of the elements to be displayed
    }
  },
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

      this.pageRequested = this.properties.current_page
      this.lastPage = this.properties.last_page
      this.currentPage = this.properties.current_page
    },
    dispatchNewProperties(target) {
      let page = target === 'updatePaginationTable' ? this.pageRequested : this.currentPage
      // TODO: when you're in the last page of the pagination && change the 'items_per_page' something goes broken...
      this.fireEvent(target, {
        'per_page': this.properties.items_per_page,
        'page': parseInt(page)
      })
    },
    movePosition(operation) {
      this.pageRequested = operation === '++' ? this.properties.current_page + 1 : this.properties.current_page - 1
    },
    setDinamicEvent () {
      let currentPath = this.$route.name
      if (!currentPath) return
      this.event = 'update-' + currentPath + '-pagination-component'
    }
  },
  mounted() {
    this.setProperties()
  }
}
</script>