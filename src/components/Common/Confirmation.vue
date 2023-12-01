<template>
  <div>
    <v-dialog
      v-model="visible"
      max-width="18vw"
      persistent
    >
      <v-card>
        <v-card-text class="d-flex text-center justify-space-around text-h6">
          {{ translate("confirmations.remove") }}
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around py-3">
          <v-btn
            color="red"
            variant="outlined"
            :min-width="buttonWidth"
            @click.stop="submit()"
            class="text-h6"
          >{{ translate("confirmations.yes") }}</v-btn>
          <v-btn
            color="success"
            variant="outlined"
            :min-width="buttonWidth"
            @click="visible = false"
            class="text-h6"
          >{{ translate("confirmations.no") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Table from './Table.vue';

export default {
  extends: Table,
  data () {
    return {
      buttonWidth: 140,
      visible: false,
      apiService: null,
      itemId: null,
      event: null,
      preventRemoveItem: null,
      preventSnackbar: null,
      preventReload: null,
    }
  },
  methods: {
    handle(data) {
      this.itemId = data.id
      this.apiService = data.apiService
      this.event = data.event
      this.preventRemoveItem = data.preventRemoveItem,
      this.preventSnackbar = data.preventSnackbar,
      this.preventReload = data.preventReload,
      setTimeout(() => { this.visible = true }, 100);
    },
    submit() {
      this.remove(this.itemId)
      this.visible = false
    },
    successCallBack() {
      this.fireEvent(this.event)
    }
  },
  mounted() {
    this.listenEvent("confirmation-dialog", this.handle)
  },
  beforeDestroy() {
    this.unlistenEvent("confirmation-dialog", this.handle)
  },
}
</script>