<template>
  <div>
    <v-dialog
      v-model="visible"
      width="auto"
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
      landlordId: null,
      event: null,
      preventRemoveItem: null,
      preventSnackbar: null,
      preventReload: null,
    }
  },
  methods: {
    handle(data) {
      this.landlordId = data.landlordId
      this.itemId = data.id
      this.apiService = data.apiService
      this.event = data.event
      this.preventRemoveItem = data.preventRemoveItem,
      this.preventSnackbar = data.preventSnackbar,
      this.preventReload = data.preventReload,
      setTimeout(() => { this.visible = true }, 100);
    },
    submit() {
      console.log(this.landlordId);
      !this.landlordId ? this.remove(this.itemId) : this.submitRemove(this.landlordId, this.itemId);
      this.visible = false
    },
    async submitRemove(landlordId, id) {
      if (this.breakRequest()) return

      try {
        if (!this.preventReload) this.loading = true

        const request = { id: id };
        const resp = await this.apiService.removeUser(landlordId, request);

        if (!this.preventRemoveItem) this.removeItem(id)
        if (!this.preventSnackbar) this.successSnackbar(resp.message)
        this.loading = false
        this.successCallBack(id)
      } catch (error) {
        console.log(error)
      }
    },
    successCallBack(resp) {
      this.fireEvent(this.event, resp)
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