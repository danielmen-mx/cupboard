<template>
  <div>
    <v-dialog
      v-model="visible"
      max-width="15vw"
    >
      <v-card>
        <v-card-text class="d-flex text-center justify-space-around text-h6">
          {{ translate("confirmations.remove") }}
        </v-card-text>
        <v-card-actions class="d-flex justify-space-around py-3">
          <v-btn
            color="red"
            @click="confirm()"
            class="text-h6"
          >{{ translate("confirmations.yes") }}</v-btn>
          <v-btn
            color="success"
            @click="visible = false"
            class="text-h6"
          >{{ translate("confirmations.no") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        itemId: null,
        visible: false,
        event: 'confirmation-dialog'
      }
    },
    methods: {
      handle(data) {
        this.visible = true
        this.itemId = data
      },
      confirm() {
        this.fireEvent('deletion-confirmation', this.itemId)
        this.visible = false
      }
    },
    mounted() {
      this.listenEvent(this.event, this.handle)
    },
    beforeDestroy() {
      this.unlistenEvent(this.event, this.handle)
    },
  }
</script>