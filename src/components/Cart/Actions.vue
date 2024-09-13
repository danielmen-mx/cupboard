<template>  
  <v-btn variant="text" size="small" class="mr-2 ma-2 pa-2" color="blue-darken-4" @click="this.form.status = 'cancelled'; submit()">Remove</v-btn>
  <v-btn variant="text" size="small" class="mx-2 ma-2 pa-2" color="blue-darken-4" @click="this.form.status = 'deferred'; submit()">Save for later</v-btn>
  <v-btn variant="text" size="small" class="ml-2 ma-2 pa-2" color="blue-darken-4" @click="">Buy now</v-btn>
</template>
<script>
import Form from '../Common/Form.vue';
import CartService from '../../services/CartService';

export default {
  extends: Form,
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
      apiService: CartService,
      preventSnackbar: true
    }
  },
  methods: {
    successCallBack(resp) {
      this.fireEvent("update-cart-table", resp.id)
    }
  },
  mounted() {
    if (!this.parent_item_form) return
    this.itemId = this.parent_item_form.id
    this.form = {
      status: this.parent_item_form.status,
      quantity: this.parent_item_form.quantity
    }
    // this.form.product_id = 
  },
}
</script>