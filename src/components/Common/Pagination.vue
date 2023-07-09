<template>
  <v-card class="d-flex justify-end bg-grey-lighten-3 elevation-0" style="height: 6.2vh;">
    <p class="pa-4">Items per page:</p>
    <div>
      <v-select
        v-model="properties.items_per_page"
        :items="['15', '25', '50']"
        variant="outlined"
        
      ></v-select>
    </div>
    <p class="pa-4 ml-2">{{ properties.first_item }} - {{ properties.last_item }} of {{ properties.total_items }}</p>
    <div class="pa-2">
      <v-btn
        :disabled="backDisabled"
        variant="text"
        @click="back()"
      ><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-btn
        :disabled="forwardDisabled"
        variant="text"
        @click="forward()"
      ><v-icon>mdi-arrow-right</v-icon></v-btn>
    </div>
  </v-card>
</template>
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
  }),
  computed: {
    backDisabled() {
      if (this.properties.current_page == 1) return true

      return false
    },
    forwardDisabled() {
      if (this.properties.current_page === this.properties.last_page) return true

      return false
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
    },
    dispatchNewProperties() {
      this.fireEvent('updatePaginationTable', {
        'per_page': parseInt(this.properties.items_per_page),
        'page': parseInt(this.pageRequested)
      })
    },
    back() {
      this.pageRequested = (this.properties.current_page - 1)
    },
    forward() {
      this.pageRequested = (this.properties.current_page + 1)
    }
  },
  mounted() {
    this.setProperties()
  },
  watch: {
    'properties.items_per_page': {
      handler: function () {
        if (!this.properties.items_per_page) return
        this.dispatchNewProperties()
      },
      deep: true,
      immediate: true
    },
    'pageRequested': {
      handler: function () {
        if (!this.pageRequested || this.pageRequested === this.properties.current_page) return
        this.dispatchNewProperties()
      }
    }
  }
}
</script>