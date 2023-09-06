<template>
  <div class="d-flex justify-end bg-grey-lighten-3">
    <div class="d-flex">
      <p class="pa-4">{{ $t("paginations.per-page") }}:</p>
      <v-select
        v-model="properties.items_per_page"
        :items="['15', '25', '50']"
        variant=""
        :disabled="itemsPerPageDisabled"
      ></v-select>
    </div>
    <p class="pa-4">{{ properties.first_item }} - {{ properties.last_item }} of {{ properties.total_items }}</p>
    <div class="pa-2">
      <v-btn
        :disabled="backDisabled"
        variant="text"
        @click="movePosition(`--`)"
      ><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-btn
        :disabled="forwardDisabled"
        variant="text"
        @click="movePosition(`++`)"
      ><v-icon>mdi-arrow-right</v-icon></v-btn>
    </div>
  </div>
</template>
<script>
// IMPORTANT: in the line 8 v-select > variant property is empty, keep as it is because there's no way to use the style we need
import Pagination from '../Pagination.vue'

export default {
  extends: Pagination,
  props: {
    pagination_values: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      event: 'updatePaginationTable'
    }
  },
  mounted() {
    this.setProperties()
  },
  watch: {
    'properties.items_per_page': {
      handler: function () {
        if (!this.properties.items_per_page) return
        this.dispatchNewProperties(this.event)
      },
      deep: true,
      immediate: true
    },
    'pageRequested': {
      handler: function () {
        if (!this.pageRequested || this.pageRequested === this.properties.current_page) return
        this.dispatchNewProperties(this.event)
      }
    }
  }
}
</script>