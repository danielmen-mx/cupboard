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
import Pagination from '../Pagination.vue'

export default {
  extends: Pagination,
  props: {
    pagination_values: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      event: 'update-current-pagination-table'
    }
  },
  methods: {
    setDinamicEvent () {
      let currentPath = this.$route.name
      if (!currentPath) return
      this.event = 'update-' + currentPath + '-pagination-table'
    }
  },
  mounted() {
    this.setProperties()
    this.setDinamicEvent()
  },
  watch: {
    'currentPage': {
      handler: function () {
        if (this.currentPage === this.properties.current_page) return
        this.dispatchNewProperties(this.event)
      }
    }
  }
}
</script>