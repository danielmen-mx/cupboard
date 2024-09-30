<template>
  <v-btn icon="mdi-trash-can" :ripple="false" flat @click="updateState('cancelled')"></v-btn>
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
  mounted() {
    if (!this.parent_item_form) return
    this.itemId = this.parent_item_form.id
    this.form = {
      status: this.parent_item_form.status,
      quantity: this.parent_item_form.quantity
    }
  },
}
</script>