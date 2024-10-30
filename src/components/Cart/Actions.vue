<template>  
  <v-btn variant="text" size="small" class="mr-2 ma-2 pa-1" color="blue-darken-4" @click="updateState('cancelled')">Remove</v-btn>
  <v-btn variant="text" size="small" class="mx-2 ma-2 pa-1" color="blue-darken-4" @click="updateState('deferred')">Save for later</v-btn>
  <v-btn size="small" class="ml-2 ma-2 pa-1 shiny-text" color="success" @click="buyNow(productId)">Buy now</v-btn>
</template>
<script>
import Actions from './Common/Actions.vue';

export default {
  extends: Actions,
  props: {
    parent_item_form: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      form: {},
      itemId: null,
    }
  },
  methods: {
    //
  },
  mounted() {
    if (!this.parent_item_form) return
    this.productId = this.parent_item_form.product.id
    this.itemId = this.parent_item_form.id
    this.form = {
      status: this.parent_item_form.status,
      quantity: this.parent_item_form.quantity
    }
  },
}
</script>